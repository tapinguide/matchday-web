import React, { Component } from 'react';
import Matches from './components/Match/Matches';
import logo from './images/tapin-logo.png';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="w-container">
          <div className="info">
            <div className="logoname">
              <img alt="Tapin Guide Logo" src={logo} />
            </div>
            <div className="bigtext">
              <span>Vital</span><br/>
              <span>Matches</span><br/>
              <span>of the</span><br/>
              <span>Week</span><br/>
            </div>
          </div>
          <div className="matches">
            <Matches></Matches>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
