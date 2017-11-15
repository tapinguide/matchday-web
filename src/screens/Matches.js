import React, { Component } from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';

// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Match from '../components/Match/Match';
import MustReadWatch from '../components/MustReadWatch/MustReadWatch';

// Assets
import logo from '../assets/images/tapin-logo.png';

var Loader = require('react-loader');
var axios = require("axios");

// Matches API Configuration
const domain = "https://api.tapinguide.com/"

const matchesUrl = domain + "/activematches/?format=json";
// Demo API for development:
// var matchesUrl = "https://api.tapinguide.demo.nordicdev.io/api/activematches/?format=json"

const readWatchUrl = domain + "/mustreadwatch/?format=json";
const contextBlurbUrl = domain + "/contextblurb/?format=json";



export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      readWatch: [],
      contextBlurb: '',
      loaded: false,
      matchDateRange: ''
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateMatches(),
      5000
    );
    this.updateMatches();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateMatches() {

    var _this = this;
    axios.all([
      this.getMatches(),
      this.getReadWatch(),
      this.getContextBlurb()
      ]).then(axios.spread(function (matchesResult, readWatchResult, contextBlurbResult) {
          var matches = matchesResult.data;
          var readWatch = readWatchResult.data;
          var contextBlurb = contextBlurbResult.data[0].text;
          var notCompleted = [];
          var completed = [];
          for(var i = 0, numResults = matches.length; i < numResults; i++){
              if(matches[i].status.description.toLowerCase() === "ft"
                || matches[i].status.description.toLowerCase() === "aet"
                || matches[i].status.description.toLowerCase() === "pen."
                || matches[i].status.description.toLowerCase() === "cancl."){
                completed.push(matches[i]);
              }
              else{
                notCompleted.push(matches[i]);
              }
          }

          notCompleted.sort(function(a,b){
             return new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id;
          }).reverse();

          completed.sort(function(a,b){
            return new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id;
          });

           _this.setState({
            matches: notCompleted.concat(completed),
            readWatch: readWatch,
            contextBlurb: contextBlurb,
            loaded: true
          });

          _this.setMatchDateRange();
        }));
  }

  getMatches(){
    return axios.get(matchesUrl)
  }

  getReadWatch(){
    return axios.get(readWatchUrl)
  }

  getContextBlurb(){
    return axios.get(contextBlurbUrl);
  }

  setMatchDateRange(){
    var sortedMatches = JSON.parse(JSON.stringify(this.state.matches));
    sortedMatches.sort(function(a,b){
      return new Date(a.matchTime) - new Date(b.matchTime);
    });

    var matchDateRange = ''
    var firstMatchDate = moment.utc(sortedMatches[0].matchTime).local();
    var lastMatchDate = moment.utc(sortedMatches[sortedMatches.length - 1].matchTime).local();

    //check if the matches are in the same month; else display different months
    if(firstMatchDate.format('M') === lastMatchDate.format('M')){
      matchDateRange = firstMatchDate.format('MMMM D').toUpperCase() + '-' + lastMatchDate.local().format('D, YYYY').toUpperCase();
    }
    else{
      matchDateRange = firstMatchDate.format('MMMM D').toUpperCase() + '-' + lastMatchDate.local().format('MMMM D, YYYY').toUpperCase();
    }

    this.setState({
      matchDateRange: matchDateRange
    });
  }

  render() {
    if(this.state.loaded){
      var columnLeft = [];
      var columnRight = [];
      this.state.matches.forEach((match, i) => {
        // Add all matches to left column
        columnLeft.push(<Match minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);
        columnRight.push(<Match minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);
      });

      var readWatch = this.state.readWatch;
      if(readWatch.length > 0){
      var mustReadLeft;
      var mustReadRight;

      mustReadLeft = readWatch[0];
      mustReadRight = readWatch[1];

      columnLeft.push(<MustReadWatch link={mustReadLeft} key="mustRead" additionalClass="must-read" />);
      columnLeft.push(<MustReadWatch link={mustReadRight} key="mustWatch" additionalClass="must-watch" />);
      columnRight.push(<MustReadWatch link={mustReadRight} key="mustWatch" additionalClass="must-watch" />);
      }
    }
    var bigtext = "Essential Matches";
    return (
          <div className="container-fluid container-fluid-matches">
            <div className="wrapper wrapper-matches">
              <div className="info desktop-header">
                <div className="header-logo">
                  <img alt="Tapin Guide Logo" src={logo} />
                </div>
                <div className="bigtext">
                  <span>{bigtext}</span>
                </div>
                <div className="dateRangeText">
                  <span>{this.state.matchDateRange}</span>
                </div>
                <div className="contextblurb">
                  <span>{renderHTML(this.state.contextBlurb)}</span>
                </div>
              </div>
              <Header
                bigtext={bigtext}
                smalltext={this.state.matchDateRange}
                contextblurb={this.state.contextBlurb}
              />
              <Loader loadedClassName="matches-container" loaded={this.state.loaded} color="#5d5d5d">
                <div className="matches">
                  <div className="matches-column column-left">
                     {columnLeft}
                  </div>
                  <div className="matches-column column-right">
                    {columnRight}
                  </div>
                  <Footer />
                </div>
              </Loader>

            </div>
          </div>
    );
  }
}

