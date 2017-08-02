import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

import appStoreLogo from './images/app-store.png';
import googlePlayLogo from './images/google-play.png';
import facebookLogo from './images/facebook-logo.svg';
import twitterLogo from './images/twitter-logo.svg';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-nav">
          <nav className="footer-nav-primary">
            <Link
              className="footer-text-link"
              to="/matchday"
            >
              Matches
            </Link>
            <Link
              className="footer-text-link"
              to="/about"
            >
              About
            </Link>
          </nav>
          <nav className="footer-nav-social">
            <Link
              className="footer-nav-social-icon"
              to="https://www.facebook.com/tapindesign"
              target="_blank"
            >
              <img alt="Facebook" src={facebookLogo} />
            </Link>
            <Link
              className="footer-nav-social-icon"
              to="https://www.twitter.com/tapinguide"
              target="_blank"
            >
              <img alt="Twitter" src={twitterLogo} />
            </Link>
          </nav>
        </div>
        <div className="footer-app-store-links">
          <Link
            className="footer-app-store-logo"
            to="/about"
            target="_blank"
          >
            <img alt="App Store" src={appStoreLogo} />
          </Link>
          <Link
            className="footer-app-store-logo"
            to="/about"
            target="_blank"
          >
            <img alt="Google Play Store" src={googlePlayLogo} />
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;