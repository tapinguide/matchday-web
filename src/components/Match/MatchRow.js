import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png';
import seconds from './images/seconds.gif';
import renderHTML from 'react-render-html';
import './css/match.css';

export default class MatchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  expandCollapse(value) {

    this.setState({expanded: !value});
  }

  openHighlights = (event, highlightsUrl) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    console.log('clicked: ', highlightsUrl);
  }

  getClass(value, optionalClass){
      if(value){
          return "match w-clearfix has-expander expander-open " + optionalClass;
      }
      else{
          return "match w-clearfix has-expander expander-closed " + optionalClass;
      }
  }
  render() {
    var numberStyle = {backgroundImage: "url(" + rectangle + ")"};

    var ref = 'match';
    let matchRow = null;
    var match = this.props.match;
    var matchIndex = this.props.matchIndex + 1;

    var homeClubScore = match.homeClubScore;
    var homeClubPenalties = match.homeClubPenalties;
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubShortName = match.homeClub.shortName;

    var visitorClubScore = match.visitorClubScore;
    var visitorClubPenalties = match.visitorClubPenalties;
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubShortName = match.visitorClub.shortName;
    var highlightsUrl = match.highlightsUrl;

    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var narrative = match.preMatchDetails;

    if(match.inMatchDetails){
      narrative = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      narrative = match.postMatchDetails
    }

    if(narrative.length > 320){
      narrative = narrative.substring(0, 320) + '...';
    }

    var matchStatusDescription = match.status.description;

    if(matchStatusDescription === "Pen.")
    {
      homeClubScore = homeClubScore + ' (' + homeClubPenalties + ')';
      visitorClubScore = visitorClubScore + ' (' + visitorClubPenalties + ')';
      matchStatusDescription = "FT (P)";
    }
    else if(matchStatusDescription === "In Progress"){
      matchStatusDescription = match.timer + "'";
    }
    else if(matchStatusDescription === "Cancl."){
      matchStatusDescription = "Canceled"
    }
    else if(matchStatusDescription === "Post."){
      matchStatusDescription = "Postponed"
    }

    var tvDetails = match.tvDetails;
    var venue = match.venue;
    var venueCity = match.venueCity;

    if(venue === '' && venueCity !=='' ){
      venue = venueCity;
    }
    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    let highlightsLink = null;
    if (highlightsUrl != null) {
      highlightsLink =
        <Link
          to={highlightsUrl}
          target="_blank"
          onClick={(event) => this.openHighlights(event, highlightsUrl)}
          className="highlights-link"
        >
        <div className="highlights-link-icon"></div>
        Highlights
      </Link>;
    }

    if(match.status.description === "Scheduled" || match.status.description === "Post."){
      matchRow = (
       <div ref={ref} className={this.getClass(this.state.expanded, 'matchscheduled')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
          <div className="numberbg" style={numberStyle}>
            <div className="numberplace">{matchIndex}</div>
          </div>
          <div className="contentcontainer w-clearfix scheduled">
            <div className="innercontainer">
              <div className="crestcontainer">
                <div className="homecrest">
                  <img src={homeClubCrestUrl} alt={homeClubShortName} />
                </div>
                <div className="shortname">{homeClubShortName}</div>
                <div className="vs"></div>
                <div className="awaycrest">
                  <img src={visitorClubCrestUrl} alt={visitorClubShortName} />
                </div>
                <div className="shortname">{visitorClubShortName}</div>
              </div>
              <div className="infocontainer">
                <div className="datetime">{matchDate}</div>
                <div className="narrative">{renderHTML(narrative)}</div>
              </div>
            </div>
             <MoreInfo events={sortedEvents} expandedState={this.state.expanded} tvDetails={tvDetails} venue={venue}  />
          </div>
        </div>
      )
    }
    else if (match.status.description === "FT"
      || match.status.description === "AET"
      || match.status.description === "Pen."
      || match.status.description === "Awarded"
      || match.status.description === "Cancl."){
      matchRow = (
          <div ref={ref} className={this.getClass(this.state.expanded, 'matchcomplete')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
                <div className="numberbg" style={numberStyle}>
                  <div className="numberplace">{matchIndex}</div>
                </div>
                <div className="contentcontainer completed">
                   <div className="innercontainer">
                  <div className="livescore">
                    <div className="scoreformatting">{homeClubScore}</div>
                    <div className="homecrest scoreformatting">
                      <img src={homeClubCrestUrl} alt={homeClubShortName} />
                      <div className="shortname">
                        {homeClubShortName}
                      </div>
                    </div>
                    <div className="scoreformatting scoretime">
                        <div>{matchStatusDescription}</div>
                    </div>
                    <div className="awaycrest scoreformatting">
                      <img src={visitorClubCrestUrl} alt={visitorClubShortName} />
                      <div className="shortname">
                        {visitorClubShortName}
                      </div>
                    </div>
                    <div className="scoreformatting">{visitorClubScore}</div>
                  </div>
                  <div className="livenarrative livenarrativecomplete narrative">
                    <div className="match-highlights-link-container">
                      {highlightsLink}
                    </div>
                    <div className="match-summary">
                      {renderHTML(narrative)}
                    </div>
                  </div>
                  </div>
                  <MoreInfo events={sortedEvents} expandedState={this.state.expanded} tvDetails={tvDetails} venue={venue} />
                </div>
              </div>
      )
    }
    else if (match.status.description === "In Progress"|| match.status.description === "HT" ) {
       matchRow = (
            <div ref={ref} className={this.getClass(this.state.expanded, '')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
              <div className="numberbg" style={numberStyle}>
                <div className="numberplace">{matchIndex}</div>
              </div>
              <div className="contentcontainer w-clearfix inprogress">
                 <div className="innercontainer">
                <div className="livescore">
                  <div className="scoreformatting">{homeClubScore}</div>
                  <div className="homecrest scoreformatting">
                    <img src={homeClubCrestUrl} alt={homeClubShortName} />
                    <div className="shortname">
                      {homeClubShortName}
                    </div>
                  </div>
                  <div className="scoreformatting scoretime in-progress">
                    <div>{matchStatusDescription}</div>
                    <div className="seconds">
                      <img src={seconds} alt="" />
                    </div>
                  </div>
                  <div className="awaycrest scoreformatting">
                    <img src={visitorClubCrestUrl} alt={visitorClubShortName} />
                    <div className="shortname">
                      {visitorClubShortName}
                    </div>
                  </div>
                  <div className="scoreformatting">{visitorClubScore}</div>
                </div>
                <div className="livenarrative narrative">{renderHTML(narrative)}</div>
                </div>
                <MoreInfo events={sortedEvents} expandedState={this.state.expanded} tvDetails={tvDetails} venue={venue} />
              </div>
            </div>
       )
    }

    return (
      <div className="match-container">
        {matchRow}
      </div>
    );
  }
}
