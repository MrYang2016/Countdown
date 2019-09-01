import React from 'react';
import './style.css';

class SelectType extends React.Component {
  render() {
    return (
      <div className="selectType">
        <div className="timeType_out">
          <select onChange={this.handleSlecteType.bind(this)} className="timeType">
            {Object.keys(this.props.showType).map(
              type => <option className="timeType-option" key={type} value={type}>今{this.props.showType[type]}剩余时间</option>
            )}
          </select>
        </div>
      </div>
    )
  }
  handleSlecteType(e) {
    const $select = e.target;
    if (!$select) return;
    const i = $select.selectedIndex;
    if (this.props.changeType) this.props.changeType($select.options[i].value);
  }
}

export default SelectType;