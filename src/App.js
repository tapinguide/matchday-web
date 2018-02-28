import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

// Assets
import './assets/styles/styles.css';

// Screens
import Matches from './screens/Matches';
import Tables from './screens/Tables';
import Wallpaper from './screens/Wallpaper/Wallpaper';
import About from './screens/About/About';
import Contact from './screens/Contact';
import Privacy from './screens/Privacy/Privacy';
import Splash from './screens/Splash/Splash';

// Matches API Configuration
const domain = "https://api.tapinguide.com/"
const contextBlurbUrl = domain + "/contextblurb/?format=json";

const matchesUrl = domain + "/activematches/?format=json";
// Demo API for development:
// var matchesUrl = "https://api.tapinguide.demo.nordicdev.io/api/activematches/?format=json"

const readWatchUrl = domain + "/mustreadwatch/?format=json";

class App extends Component {
  state = {
    contextBlurb: '',
    matchDateRange: '',
    matches: [],
    readWatch: [],
    loaded: false
  }

  componentDidMount() {
    // this.setContextBlurb();
    this.updateAppData()
  }

  updateAppData = () => {
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

  setMatchDateRange = () =>{
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

    this.setState(({
      matchDateRange: matchDateRange
    }));
  }

  render() {
    const {
      matchDateRange,
      contextBlurb,
      matches,
      readWatch,
      loaded
    } = this.state;

    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Matches {...props}
            updateMatches={ this.updateAppData }
            matches={matches}
            contextBlurb={contextBlurb}
            matchDateRange={matchDateRange}
            parentLoaded={loaded}
          />
        )} />
        <Route exact path="/tables" render={(props) => (
          <Tables {...props}
            contextBlurb={ contextBlurb }
            contextBlurb={contextBlurb}
            matchDateRange={matchDateRange}
            parentLoaded={loaded}
          />
        )} />
        <Route path='/wallpaper' component={Wallpaper}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/privacy' component={Privacy}/>
        <Route path='/splash' component={Splash}/>
      </Switch>
    );
  }
}

export default App;
