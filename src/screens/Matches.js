import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import axios from 'axios';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Match from '../components/Match/Match';
import MustReadWatch from '../components/MustReadWatch/MustReadWatch';

// Assets
import logo from '../assets/images/tapin-logo.png';

var Loader = require('react-loader');

const readWatchUrl = "https://api.tapinguide.com/mustreadwatch/?format=json";


export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      readWatch: [],
      contextBlurb: '',
      loaded: false,
      matchDateRange: '',
      parentLoaded: false
    };
  }

  componentDidMount() {
    this.setStateFromProps(this.props);

    this.timerID = setInterval(
      () => this.props.updateMatches(),
      5000
    );
    this.props.updateMatches();
    this.updateReadWatch()
  }

  componentWillReceiveProps(nextProps) {
    this.setStateFromProps(nextProps);
  }

  setStateFromProps(props) {
    const {
      matches,
      contextBlurb,
      matchDateRange,
      parentLoaded
    } = props;

    this.setState({
      matches,
      contextBlurb,
      matchDateRange,
      parentLoaded
    })
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateReadWatch() {
    var _this = this;
    axios.all([
      this.getReadWatch()
      ]).then(axios.spread(function (readWatchResult) {
        var readWatch = readWatchResult.data;

         _this.setState({
          readWatch: readWatch,
          loaded: true
        });
      }));
  }

  getReadWatch(){
    return axios.get(readWatchUrl)
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
        <Loader loadedClassName="matches-container" loaded={this.state.loaded && this.state.parentLoaded} color="#5d5d5d">
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
    );
  }
}

