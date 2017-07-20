import React from 'react';
import Header from '../Header';
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
        }));
  }

  getMatches(){
    return axios.get(matchesUrl)    
  }

  getLinks(){
    return axios.get(linksUrl)
  }

  render() {
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

    columnLeft.push(<Link link={mustRead} header="Must Read" icon={mustReadIcon} />);
    columnLeft.push(<Link link={mustWatch} header="Must Watch" icon={mustWatchIcon} />);
    columnRight.push(<Link link={mustWatch} header="Must Watch" icon={mustWatchIcon} />);
    return (
          <div className="container-fluid">
            <div className="w-container">
              <div className="info desktop-header">
                <div className="logoname">
                  <img alt="Tapin Guide Logo" src={logo} />
                </div>
                <div className="bigtext">
                  <span>Essential Matches</span>
                </div>
              </div>
              <Header />
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

