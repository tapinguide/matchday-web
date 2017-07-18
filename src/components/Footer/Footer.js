import React, { Component } from 'react';
import './css/footer.css';

import appStoreLogo from './images/app-store.png';
import googlePlayLogo from './images/google-play.png';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <img alt="App Store" src={appStoreLogo} />
        <img alt="Google Play Store" src={googlePlayLogo} />
      </footer>
    );
  }
}

export default Footer;