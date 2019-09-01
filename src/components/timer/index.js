import React from 'react';
import './style.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const dh = document.documentElement.clientHeight;
    const dw = document.documentElement.clientWidth;
    const size = dh > dw ? dw : dh;
    const t = this.getResidueTime();
    const timeSize = size * .8;
    const dotSize = size * .08;
    this.state = {
      t,
      timeSize,
      dotSize,
      dotL: (timeSize - dotSize) / 2,
      dotT: -dotSize / 2,
      ctx: null,
      lineWidth: 5,
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
    this.initCanvas();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    const t = this.getResidueTime();
    this.setState({ t })
  }
  getResidueTime() {
    const nowTime = new Date();
    const y = nowTime.getFullYear();
    const m = nowTime.getMonth() + 1;
    const d = nowTime.getDate();
    const { type = 'today' } = this.props || {};
    let residueTime = nowTime;
    const dayTime = 24 * 60 * 60 * 1000;
    let dayNum;
    let prop;
    if (type === 'today') {
      const today = new Date(`${y}/${m}/${d}`).getTime();
      const tomorrow = new Date(today + dayTime).getTime();
      residueTime = Math.floor((tomorrow - nowTime.getTime()) / 1000);
      prop = (tomorrow - nowTime.getTime()) / dayTime;
    } else if (type === 'thisYear' || type === 'live') {
      const { liveYear = 50 } = this.props || {};
      const year = y + (type === 'thisYear' ? 1 : liveYear);
      const yd = new Date(`${year}/1/1`).getTime();
      const c = yd - nowTime.getTime();
      prop = c / (yd - new Date(`${y}/1/1`).getTime());
      dayNum = Math.floor(c / dayTime);
      residueTime = Math.floor((c % dayTime) / 1000);
    }
    const h = Math.floor(residueTime / 60 / 60);
    const mi = Math.floor((residueTime - h * 60 * 60) / 60);
    const s = Math.floor(residueTime - h * 60 * 60 - mi * 60);
    const addZero = n => String(n).length === 1 ? `0${n}` : n;
    const result = `${addZero(h)}:${addZero(mi)}:${addZero(s)}`;
    const drawStart = -Math.PI / 2;
    const angle = Math.PI * 2 * (1 - prop);
    const drawEnd = angle + drawStart;
    this.clearCanvas();
    this.drawArc({
      start: drawStart,
      end: drawEnd,
      color: '#aaa',
    });
    this.drawArc({
      start: drawEnd,
      end: drawStart,
    });
    this.setDotPort(angle);
    return type === 'today' ? result : `${dayNum}天 ${result}`;
  }
  initCanvas() {
    const $canvas = document.getElementById('timeCanvas');
    const ctx = $canvas.getContext('2d');
    this.setState({ ctx });
    setTimeout(() => {
      this.drawArc();
    });
  }
  drawArc({ start = 0, end = Math.PI * 2, color = "#ea9999" } = {}) {
    if (!this.state) return;
    const r = this.state.timeSize / 2;
    const ctx = this.state.ctx;
    ctx.lineWidth = this.state.lineWidth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(r, r, r - this.state.lineWidth, start, end);
    ctx.stroke();
  }
  clearCanvas() {
    if (!this.state) return;
    const canvas = document.getElementById('timeCanvas');
    const ctx = this.state.ctx;
    canvas.width = this.state.timeSize;
    ctx.lineWidth = this.state.lineWidth;
  }
  setDotPort(angle) {
    if (!this.state) return;
    let x;
    let y;
    const r = this.state.timeSize / 2;
    const dotR = this.state.dotSize / 2;
    if (angle < Math.PI / 2) {
      x = Math.sin(angle) * r;
      y = Math.cos(angle) * r;
    } else if (angle > Math.PI / 2 && angle < Math.PI) {
      angle = angle - Math.PI / 2;
      x = Math.cos(angle) * r;
      y = -Math.sin(angle) * r;
    } else if (angle > Math.PI && angle < Math.PI * 3 / 2) {
      angle = angle - Math.PI;
      x = -Math.sin(angle) * r;
      y = -Math.cos(angle) * r;
    } else {
      angle = angle - Math.PI * 3 / 2;
      x = -Math.cos(angle) * r;
      y = Math.sin(angle) * r;
    }
    this.setState({
      dotL: x + r - dotR,
      dotT: r - y - dotR,
    });
  }
  render() {
    return (
      <div
        className="timeProgress"
        style={{
          width: `${this.state.timeSize}px`,
          height: `${this.state.timeSize}px`
        }}>
        <div
          className="timeProgress-time">
          {this.state.t}
        </div>
        <canvas className="timeProgress-canvas" id="timeCanvas" width={this.state.timeSize} height={this.state.timeSize}></canvas>
        <div
          className="timeProgress-dot"
          style={{
            width: `${this.state.dotSize}px`,
            height: `${this.state.dotSize}px`,
            left: `${this.state.dotL}px`,
            top: `${this.state.dotT}px`,
          }}
        >
        </div>
      </div>
    )
  }
}

export default Timer;