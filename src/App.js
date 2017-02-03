import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

var axios = require('axios');

class MatchRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.match.homeClub.name} - {this.props.match.homeClubScore} </td>
        <td>{this.props.match.visitorClub.name}</td>
      </tr>
    );
  }
}

class MatchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {matches: []};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
   var _this = this;
    axios
        .get("http://localhost:8000/activematches/?format=json")
        .then(function(result) {    
          _this.setState({
            matches: result.data.results
           });
        });
  }

  render() {
    var rows = [];
    this.state.matches.forEach(function(match) {
      rows.push(<MatchRow match={match} key={match.id} />);
    });
    return (
      <table>
        <thead>
          <th>Home Club</th>
          <th>Visitor Club</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Match Day</h2>
        </div>
          <MatchTable />
      </div>
    );
  }
}
 
export default App;
