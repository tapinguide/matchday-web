import React from 'react';
import Header from '../Header'
import MatchRow from './MatchRow';
import logo from '../../images/tapin-logo.png';

import './css/normalize.css';
import './css/matches.css';

var Loader = require('react-loader');
var axios = require("axios");
var matchesUrl = "https://www.tapinguide.com/api/activematches/?format=json";
//var matchesUrl = "http://localhost:8000/api/activematches/?format=json";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      loaded: false,
      minHeight: 180
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

  setCardHeights = (cardHeight) => {
    console.log('Previous height: ' + this.state.minHeight);
    this.setState({ minHeight: cardHeight }, () => {
      console.log(this.state.minHeight)
      console.log('New height: ' + cardHeight);
    });
  }

  render() {
    var columnLeft = [];
    var columnRight = [];
    this.state.matches.forEach((match, i) => {
      // Add all matches to left column
      columnLeft.push(<MatchRow minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);

      // Add only even numbered matches to right column
      if ( (i % 2) == 1) {
        columnRight.push(<MatchRow minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);
      }
    });

    return (
          <div className="container-fluid">
            <div className="w-container">
              <div className="info">
                <div className="logoname">
                  <img alt="Tapin Guide Logo" src={logo} /> <span className="smalltext headcolor">The Vital Matches</span>
                </div>
                <div className="bigtext">
                  <span>Vital</span><br/>
                  <span>Matches</span><br/>
                  <span>of the</span><br/>
                  <span>Week</span><br/>
                </div>
              </div>
            <Loader loadedClassName="matches" loaded={this.state.loaded} color="#5d5d5d">
                  <div className="column column-left">
                     {columnLeft}
                  </div>
                  <div className="column column-right">
                    {columnRight}
                  </div>

              </Loader>
            </div>
          </div>
    );
  }
}

export default Matches;
