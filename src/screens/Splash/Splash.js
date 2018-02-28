import React, { Component } from 'react';
import logo from '../../assets/images/tapin-logo-white.png';
import './styles/splash.css';

export default class Splash extends Component {
  render() {
    return (
      <div className="div-block" id="gradient">
        <div className="container">
          <img className="tapinlogo" src={logo} alt="Tap In Guide"  />
          <div className="text-block">We're getting checked out by the physio in the training room. It's just a knock, back on the pitch soon.
          </div>
        </div>
      </div>
    );
  }
}
