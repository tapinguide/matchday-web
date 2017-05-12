import React, { Component } from 'react';
import Matches from './components/Match/Matches';
import logo from './images/tapin-logo.png';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="logoname">
          <img alt="Tapin Guide Logo" src={logo} /> <span className="headcolor">The Vital Matches</span>
        </div>
        <div className="w-container">
          <Matches></Matches>
        </div>
      </div>
    );
  }
}
 
export default App;
