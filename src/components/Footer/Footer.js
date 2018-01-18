import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Assets
import appStoreLogo from './images/app-store.png';
import googlePlayLogo from './images/google-play.png';
import facebookLogo from './images/facebook-logo.svg';
import twitterLogo from './images/twitter-logo.svg';

// Components
import NewsletterSubscribeForm from '../NewsletterSubscribeForm';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-section footer-left">
          <NewsletterSubscribeForm />
          <nav className="footer-nav-primary">
            <Link
              className="footer-text-link"
              to="/"
            >
              Matches
            </Link>
            <Link
              className="footer-text-link"
              to="/about"
            >
              About
            </Link>
            <Link
              className="footer-nav-social-icon"
              to="https://www.facebook.com/tapindesign"
              target="_blank" rel="noopener"
            >
              <img alt="Facebook" src={facebookLogo} />
            </Link>
            <Link
              className="footer-nav-social-icon"
              to="https://www.twitter.com/tapinguide"
              target="_blank" rel="noopener"
            >
              <img alt="Twitter" src={twitterLogo} />
            </Link>
          </nav>
        </div>
        <div className="footer-section footer-right">
          <Link
            className="footer-app-store-logo"
            to="https://itunes.apple.com/us/app/tap-in-guide/id1265129819"
            target="_blank" rel="noopener"
          >
            <img alt="App Store" src={appStoreLogo} />
          </Link>
          <Link
            className="footer-app-store-logo android"
            to="https://play.google.com/store/apps/details?id=com.tapinguide.matchday"
            target="_blank" rel="noopener"
          >
            <img alt="Google Play Store" src={googlePlayLogo} />
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
