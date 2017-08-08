import React from 'react';
import moment from 'moment';
import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png';
import seconds from './images/seconds.svg';
import renderHTML from 'react-render-html';
import './css/match.css';

export default class MatchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }
  expandCollapse(value) {
    this.setState({expanded: !value});
  }
  getClass(value, optionalClass){
      if(value){
          return "match w-clearfix has-expander expander-openv " + optionalClass;
      }
      else{
          return "match w-clearfix has-expander expander-closed " + optionalClass;
      }
  }
  render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex + 1;
    var ref = 'match';
    
    let matchRow = null;

    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubShortName = match.homeClub.shortName;
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubShortName = match.visitorClub.shortName;
    var numberStyle = {backgroundImage: "url(" + rectangle + ")"};
    var secondsStyle = {height: "12px", backgroundPosition: "center top", backgroundRepeat: "no-repeat", backgroundImage: "url(" + seconds + ")"};

    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var matchStatus = match.status.description;
    if(match.status.description === "In Progress"){
      matchStatus = match.timer + "'";
    }

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
    var tvDetails = match.tvDetails;
    var venue = match.venue;
    var venueCity = match.venueCity;

    if(venue === '' && venueCity != '' ){
      venue = venueCity;
    }
    
    if(match.status.description === "Scheduled"){
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
    else if (match.status.description === "FT" || match.status.description === "AET"){
      matchRow = (
          <div ref={ref} className={this.getClass(this.state.expanded, 'matchcomplete')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
                <div className="numberbg" style={numberStyle}>
                  <div className="numberplace">{matchIndex}</div>
                </div>
                <div className="contentcontainer completed">
                   <div className="innercontainer">
                  <div className="livescore">
                    <div className="scoreformatting">{match.homeClubScore}</div>
                    <div className="homecrest scoreformatting">
                      <img src={homeClubCrestUrl} alt={homeClubShortName} />
                      <div className="shortname">
                        {homeClubShortName}
                      </div>
                    </div>
                    <div className="scoreformatting scoretime">
                        <div>FT</div>
                    </div>
                    <div className="awaycrest scoreformatting">
                      <img src={visitorClubCrestUrl} alt={visitorClubShortName} />
                      <div className="shortname">
                        {visitorClubShortName}
                      </div>
                    </div>
                    <div className="scoreformatting">{match.visitorClubScore}</div>
                  </div>
                  <div className="livenarrative livenarrativecomplete narrative">{renderHTML(narrative)}</div>
                  </div>
                  <MoreInfo events={sortedEvents} expandedState={this.state.expanded} tvDetails={tvDetails} venue={venue} />
                </div>
              </div>
      )
    }
    else{
       matchRow = (
            <div ref={ref} className={this.getClass(this.state.expanded, '')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
              <div className="numberbg" style={numberStyle}>
                <div className="numberplace">{matchIndex}</div>
              </div>
              <div className="contentcontainer w-clearfix inprogress">
                 <div className="innercontainer">
                <div className="livescore">
                  <div className="scoreformatting">{match.homeClubScore}</div>
                  <div className="homecrest scoreformatting">
                    <img src={homeClubCrestUrl} alt={homeClubShortName} />
                    <div className="shortname">
                      {homeClubShortName}
                    </div>
                  </div>
                  <div className="scoreformatting scoretime in-progress">
                    <div>{matchStatus}</div>
                    <div style={secondsStyle}></div>
                  </div>
                  <div className="awaycrest scoreformatting">
                    <img src={visitorClubCrestUrl} alt={visitorClubShortName} />
                    <div className="shortname">
                      {visitorClubShortName}
                    </div>
                  </div>
                  <div className="scoreformatting">{match.visitorClubScore}</div>
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
