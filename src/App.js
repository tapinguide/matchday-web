import React, { Component } from 'react';
import './css/match-day.webflow.css';
import MatchTable from './MatchTable';

class App extends Component {
  render() {
    return (
 <div className="w-container">
    <MatchTable />
  </div>
    );
  }
}
 
export default App;
