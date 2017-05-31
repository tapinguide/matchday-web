import React, { Component } from 'react';
import logo from '../images/tapin-logo.png';

class Header extends Component {
  render() {
    return (
        <div className="logoname">
          <img alt="Tapin Guide Logo" src={logo} /> <span className="headcolor">The Vital Matches</span>
        </div>
    );
  }
}
 
export default Header;
