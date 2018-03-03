import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import renderHTML from 'react-render-html';

import logo from '../assets/images/tapin-logo.png';

export default class HeaderDesktop extends Component {
  state = {
    contextBlurb: '',
    matchDateRange: '',
    isLoading: true,
  }

  componentDidMount() {
    this.initializeHeader(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.initializeHeader(nextProps)
  }

  initializeHeader(props) {
    const { contextBlurb, matchDateRange } = props;

    if (contextBlurb && matchDateRange) {
      this.setState({
        contextBlurb,
        matchDateRange,
        isLoading: false
      })
    }
  }

  isActive(desiredPath) {
    const path = window.location.pathname;

    if (path === desiredPath ) {
      return true
    } else {
      return false;
    }
  }

  renderContextBlurb() {
    const { contextBlurb } = this.props;

    return contextBlurb
    ? (
      <div className="contextblurb">
        <span>{renderHTML(contextBlurb)}</span>
      </div>
    ) : null
  }

  render() {
    const {
      bigText,
    } = this.props;

    const {
      isLoading,
      matchDateRange
    } = this.state;

    return (
      <div className="info header">
        <div className="header-logo">
          <Link to="/">
            <img alt="Tapin Guide Logo" src={logo} />
          </Link>
        </div>
        <div className="bigtext">
          <span>{bigText}</span>
        </div>
        {
          !isLoading &&
          <div className="header-content">
            <div className="date-range-text">
              <span>{ matchDateRange }</span>
            </div>
            {this.renderContextBlurb()}
            <nav className="header-nav">
              <ul>
                <li>
                  <Link
                    to="/"
                    className={this.isActive('/') ? 'active' : ''}
                  >
                    Matches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tables"
                    className={this.isActive('/tables') ? 'active' : ''}
                  >
                    Tables
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        }
      </div>
    );
  }
}

