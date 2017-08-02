import React, { Component } from 'react';
import logo from '../../images/tapin-logo.png';

export default class Header extends Component {
  render() {
  var bigtext = this.props.bigtext;
    return (
      <div className="mobile-header">
        <div className="bigtext">
          <span>{this.props.bigtext}</span>
          <div className="dateRangeText">
          <span>{this.props.smalltext}</span>
        </div>
        </div>
        <div className="logoname">
          <img alt="Tapin Guide Logo" src={logo} />
        </div>
      </div>
    );
  }
}

