import React, { Component } from 'react';

export default class ChartCard extends Component {
  render() {
    return (
      <div className={'chart-card'}>
        <div className={'header'}>
          <h4 className='title'>{this.props.title}</h4>
        </div>
        <div className={'content '}>{this.props.content}</div>
      </div>
    );
  }
}
