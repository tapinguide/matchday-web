import React, { Component } from 'react';
import logo from './images/logo.svg';
import subon from './images/subon.svg';
import suboff from './images/suboff.svg';
import shapegreen from './images/shapegreen.svg'
import './css/match-day.webflow.css';
import moment from 'moment'

var axios = require('axios');

class Event extends React.Component{
  render(){
    return (
    <div className="card">
          <div className="cardheader yellow">
            <div className="gametime">38'</div>
            <div className="headertitle">Yellow Card</div>
          </div>
          <div className="homecrest incard"></div>
          <div className="playernamecard">Zlatan Ibrahimovich</div>
          <div className="timeline"></div>
        </div>
    );
  }
}
class InProgressRow extends React.Component {
  render(){

    var activeMatch = this.props.match;
    var match = activeMatch.match;
    var homeClub = match.homeClub;
    var visitorClub = match.visitorClub;
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {
            backgroundImage: 'url(' + homeClubCrestUrl + ')'
        }
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {
            backgroundImage: 'url(' + visitorClubCrestUrl + ')'
        }
    var expanderStyle = {
      backgroundImage: "url(" + shapegreen + ")"
    }
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var postMatchDetails = activeMatch.preMatchDetails;

    if(match.inMatchDetails){
      postMatchDetails = activeMatch.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = activeMatch.postMatchDetails
    }

    var matchStatus = match.status.description;
    if(match.status.description == "In Progress"){
      matchStatus = match.timer + "'";
    }

    return (
              <div className="match w-clearfix">
                <div className="numberbg">
                  <div className="numberplace">{activeMatch.sortOrder}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="homescore">{match.homeClubScore}</div>
                    <div className="homecrest homescore" style={homeClubCrestStyle}></div>
                    <div className="homescore scoretime">{matchStatus}</div>
                    <div className="awaycrest homescore"  style={visitorClubCrestStyle}></div>
                    <div className="awayscore">{match.visitorClubScore}</div>
                  </div>
                  <div className="livenarrative livenarrativecomplete narrative">{postMatchDetails}</div>
                  <Event />
                </div>
                <div className="expander" style={expanderStyle} ></div>
              </div>
    );
  }
}

class CompleteRow extends React.Component {
  render(){

    var activeMatch = this.props.match;
    var match = activeMatch.match;
    var homeClub = match.homeClub;
    var visitorClub = match.visitorClub;
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {
            backgroundImage: 'url(' + homeClubCrestUrl + ')'
        }
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {
            backgroundImage: 'url(' + visitorClubCrestUrl + ')'
        }
    var expanderStyle = {
      backgroundImage: "url(" + shapegreen + ")"
    }
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var postMatchDetails = activeMatch.preMatchDetails;

    if(match.inMatchDetails){
      postMatchDetails = activeMatch.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = activeMatch.postMatchDetails
    }
    return (
              <div className="match matchcomplete w-clearfix">
                <div className="numberbg">
                  <div className="numberplace">{activeMatch.sortOrder}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="homescore">{match.homeClubScore}</div>
                    <div className="homecrest homescore" style={homeClubCrestStyle}></div>
                    <div className="homescore scoretime">FT</div>
                    <div className="awaycrest homescore"  style={visitorClubCrestStyle}></div>
                    <div className="awayscore">{match.visitorClubScore}</div>
                  </div>
                  <div className="livenarrative livenarrativecomplete narrative">{postMatchDetails}</div>
                  <Event />
                </div>
                <div className="expander" style={expanderStyle} ></div>
              </div>
    );
  }
}

class ScheduledRow extends React.Component {
  
  render() {
    var activeMatch = this.props.match;
    var match = activeMatch.match;
    var homeClub = match.homeClub;
    var visitorClub = match.visitorClub;
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {
            backgroundImage: 'url(' + homeClubCrestUrl + ')'
        }
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {
            backgroundImage: 'url(' + visitorClubCrestUrl + ')'
        }
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
return (
      <div className="match w-clearfix">
      <div className="numberbg">
        <div className="numberplace">{activeMatch.sortOrder}</div>
      </div>
      <div className="contentcontainer w-clearfix">
        <div className="crestcontainer">
          <div className="homecrest" style={homeClubCrestStyle}></div>
          <div className="vs">VS</div>
          <div className="awaycrest" style={visitorClubCrestStyle}></div>
        </div>
        <div className="infocontainer">
          <div className="datetime">{matchDate}</div>
          <div className="narrative">{activeMatch.preMatchDetails}</div>
        </div>
      </div>
     </div>
    );
  }
}

class MatchRow extends React.Component {
  render() {
    var match = this.props.match;
    let matchRow = null;
    if(match.match.status.description == "Scheduled"){
      matchRow = <ScheduledRow match={match} />;
    }
    else if (match.match.status.description == "FT"){
      matchRow = <CompleteRow match={match} />;
    }
    else{
       matchRow = <InProgressRow match={match} />;
    }
    return (
     <div>{matchRow}</div>
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
