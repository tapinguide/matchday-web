import React from 'react';
import Header from '../Header'
import MatchRow from './MatchRow';
import './css/normalize.css';
import './css/match-webflow.css';

var Loader = require('react-loader');
var axios = require("axios");
var matchesUrl = "http://matchday.tapinguide.com/api/activematches/?format=json";
//var matchesUrl = "http://localhost:8000/api/activematches/?format=json";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
   var _this = this;
    axios
        .get(matchesUrl,
          {
            validateStatus: function (status) {
              return status < 500;
            }
          }
        )
        .then(function(result) {   

          var results = result.data;
          var notCompleted = [];
          var completed = [];
          for(var i = 0, numResults = results.length; i < numResults; i++){
              if(results[i].status.description.toLowerCase() === "ft" || results[i].status.description.toLowerCase() === "aet"){
                completed.push(results[i]);
              }
              else{
                notCompleted.push(results[i]);
              }
          }

          completed.sort(function(a,b){
            return new Date(b.matchTime) - new Date(a.matchTime);
          });

          _this.setState({
            matches: notCompleted.concat(completed),
            loaded: true
           });
        })
        .catch(function (error) {
          if (error.response) {
            // Response has been received from the server
            console.log(error.response.data); // => the response payload
          }
      });
  }

  render() {
    var rows = [];
    this.state.matches.forEach(function(match, i) {
      rows.push(<MatchRow match={match} key={match.id} matchIndex={i} />);
    });
    return (
          <div className="container-fluid">
            <Header />
            <div className="w-container">
              <div className="info">
                <div className="bigtext">
                  <span>Vital</span><br/>
                  <span>Matches</span><br/>
                  <span>of the</span><br/>
                  <span>Week</span><br/>
                </div>          
              </div>
            <div className="matches">
              <Loader loaded={this.state.loaded} color="#5d5d5d">
                  {rows}
                </Loader>
  +         </div>
          </div>
        </div>
    );
  }
}

export default Matches;
