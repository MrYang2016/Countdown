import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.getResidueTime()
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    this.setState({
      t: this.getResidueTime()
    })
  }
  getResidueTime() {
    const nowTime = new Date();
    const y = nowTime.getFullYear();
    const m = nowTime.getMonth() + 1;
    const d = nowTime.getDate();
    const today = new Date(`${y}-${m}-${d}`);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const residueTime = Math.floor((tomorrow - nowTime) / 1000);
    const h = Math.floor(residueTime / 60 / 60);
    const mi = Math.floor((residueTime - h * 60 * 60) / 60);
    const s = Math.floor(residueTime - h * 60 * 60 - mi * 60);
    const addZero = n => String(n).length === 1 ? `0${n}` : n;
    return `${addZero(h)}:${addZero(mi)}:${addZero(s)}`;
  }
  render() {
    return <div>今日剩余时间：{this.state.t}</div>
  }
}

export default Timer;