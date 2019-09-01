import React from 'react';
import './App.css';
import Timer from './components/timer';
import SelectType from './components/selectType';

const showType = {
  today: '日',
  thisYear: '年',
  live: '生',
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: 'today',
    }
  }
  render() {
    return (
      <div className="App">
        <SelectType showType={showType} changeType={this.changeType.bind(this)} />
        <Timer type={this.state.currentType} showType={showType} />
      </div>
    )
  }
  changeType(type) {
    this.setState({
      currentType: type
    });
  }
}

export default App;
