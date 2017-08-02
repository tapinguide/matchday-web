import React from 'react';
import moment from 'moment';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MatchRow from './MatchRow';
import Link from '../Link/Link';
import logo from '../../images/tapin-logo.png';
import mustReadIcon from '../Link/images/mustread.png'
import mustWatchIcon from '../Link/images/mustwatch.png'
import './css/normalize.css';
import './css/matches.css';

var Loader = require('react-loader');
var axios = require("axios");
var matchesUrl = "https://www.tapinguide.com/api/activematches/?format=json";
var linksUrl = "https://www.tapinguide.com/api/links/?format=json";

//var matchesUrl = "http://localhost:8000/api/activematches/?format=json";
//var linksUrl = "http://localhost:8000/api/links/?format=json";

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      links: [],
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
      this.getLinks()
      ]).then(axios.spread(function (matchesResult, linksResult) {
          var matches = matchesResult.data;
          var notCompleted = [];
          var completed = [];
          for(var i = 0, numResults = matches.length; i < numResults; i++){
              if(matches[i].status.description.toLowerCase() === "ft" || matches[i].status.description.toLowerCase() === "aet"){
                completed.push(matches[i]);
              }
              else{
                notCompleted.push(matches[i]);
              }
          }
          completed.sort(function(a,b){
            return new Date(b.matchTime) - new Date(a.matchTime);
          });

           _this.setState({
            matches: notCompleted.concat(completed),
            links: linksResult.data,
            loaded: true
          });

          _this.setMatchDateRange();
        }));

  }

  getMatches(){
    return axios.get(matchesUrl)
  }

  getLinks(){
    return axios.get(linksUrl)
  }

  setMatchDateRange(){
    var matchDateRange = ''
    var firstMatchDate = moment.utc(this.state.matches[0].matchTime).local();
    var lastMatchDate = moment.utc(this.state.matches[this.state.matches.length - 1].matchTime).local();
    
    //check if the matches are in the same month; else display different months
    if(firstMatchDate.month === lastMatchDate.month){
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
        columnLeft.push(<MatchRow minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);

        // Add only even numbered matches to right column
        if ( (i % 2) === 1) {
          columnRight.push(<MatchRow minHeight={this.state.minHeight} setMinHeight={this.setMinHeight} match={match} key={match.id} matchIndex={i} />);
        }
      });
      
      var links = this.state.links;
      var mustRead;
      var mustWatch;
      
      for(var i = 0, numResults = links.length; i < numResults; i++){
          if(links[i].shortCode === 'READ'){
            mustRead = links[i];
          }
          else if(links[i].shortCode === 'WATCH')
          {
            mustWatch = links[i];
          }
      }

      columnLeft.push(<Link link={mustRead} header="Must Read" icon={mustReadIcon} key="mustRead" />);
      columnLeft.push(<Link link={mustWatch} header="Must Watch" icon={mustWatchIcon} key="mustWatch"/>);
      columnRight.push(<Link link={mustWatch} header="Must Watch" icon={mustWatchIcon} key="mustWatchRight"/>);
    }
    var bigtext = "Essential Matches";
    return (
          <div className="container-fluid">
            <div className="w-container w-container-matches">
              <div className="info desktop-header">
                <div className="logoname">
                  <img alt="Tapin Guide Logo" src={logo} />
                </div>
                <div className="bigtext">
                  <span>Essential Matches</span>
                </div>
                <div className="dateRangeText">
                  <span>{this.state.matchDateRange}</span>
                </div>
              </div>
              <Header bigtext={bigtext} smalltext={this.state.matchDateRange} />
              <Loader loadedClassName="matches-container" loaded={this.state.loaded} color="#5d5d5d">
                <div className="matches">
                  <div className="column column-left">
                     {columnLeft}
                  </div>
                  <div className="column column-right">
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

