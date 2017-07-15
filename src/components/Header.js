import React, { Component } from 'react';
import logo from '../images/tapin-logo.png';

export default class Header extends Component {
  render() {
    return (
      <div className="mobile-header">
        <div className="bigtext">
          <span>Essential Matches</span>
        </div>
        <div className="logoname">
          <img alt="Tapin Guide Logo" src={logo} />
        </div>
      </div>
    );
  }
}

