import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import renderHTML from 'react-render-html';

import logo from '../../assets/images/tapin-logo.png';

export default class Header extends Component {
  render() {
  var bigtext = this.props.bigtext;
  var smalltext = this.props.smalltext;
  var contextblurb = this.props.contextblurb;
  if(contextblurb !=null && contextblurb.length > 0){
    contextblurb = renderHTML(contextblurb);
  }
    return (
      <div className="mobile-header">
        <div className="header-text">
          <span className="bigtext">{bigtext}</span>
          <div className="dateRangeText">
            <span>{smalltext}</span>
          </div>
          <div className="contextblurb">
            <span>{contextblurb}</span>
          </div>
        </div>
        <div className="header logoname">
          <Link to="/">
          <img alt="Tapin Guide Logo" src={logo} /></Link>
        </div>
      </div>
    );
  }
}

