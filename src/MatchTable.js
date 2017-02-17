import React from 'react';
import MatchRow from './MatchRow';

var axios = require('axios');

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
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
   var _this = this;
    axios
        .get("http://localhost:8000/api/activematches/?format=json")
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
      <div>{rows}</div>
    );
  }
}

export default MatchTable;