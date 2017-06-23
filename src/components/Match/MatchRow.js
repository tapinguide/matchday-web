import React from 'react';
import moment from 'moment';
import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png';
import seconds from './images/seconds.svg';
import renderHTML from 'react-render-html';
import './css/match.css';

class MatchRow extends React.Component {
  render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex + 1;
    let matchRow = null;
    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {backgroundImage: 'url(' + homeClubCrestUrl + ')'};
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {backgroundImage: 'url(' + visitorClubCrestUrl + ')'};
    var numberStyle = {backgroundImage: "url(" + rectangle + ")"};
    var secondsStyle = {height: "12px", backgroundPosition: "center top", backgroundRepeat: "no-repeat", backgroundImage: "url(" + seconds + ")"};

    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var matchStatus = match.status.description;
    if(match.status.description === "In Progress"){
      matchStatus = match.timer + "'";
    }

    var postMatchDetails = match.preMatchDetails;
    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }
    if(match.status.description === "Scheduled"){
      matchRow = (
        <div className="match w-clearfix">
          <div className="numberbg" style={numberStyle}>
            <div className="numberplace">{matchIndex}</div>
          </div>
          <div className="contentcontainer w-clearfix">
            <div className="crestcontainer">
              <div className="homecrest" style={homeClubCrestStyle}></div>
              <div className="vs">VS</div>
              <div className="awaycrest" style={visitorClubCrestStyle}></div>
            </div>
            <div className="infocontainer">
              <div className="datetime">{matchDate}</div>
              <div className="narrative">{renderHTML(match.preMatchDetails)}</div>
            </div>
          </div>
        </div>
      )
    }
    else if (match.status.description === "FT" || match.status.description === "AET"){
      matchRow = (
          <div className="match matchcomplete w-clearfix">
                <div className="numberbg" style={numberStyle}>
                  <div className="numberplace">{matchIndex}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="scoreformatting">{match.homeClubScore}</div>
                    <div className="homecrest scoreformatting" style={homeClubCrestStyle}></div>
                    <div className="scoreformatting scoretime">
                        <div>FT</div>
                    </div>
                    <div className="awaycrest scoreformatting" style={visitorClubCrestStyle}></div>
                    <div className="scoreformatting">{match.visitorClubScore}</div>
                  </div>
                  {/*<div className="datetime">{matchDate}</div>*/}
                  <div className="livenarrative livenarrativecomplete narrative">{renderHTML(postMatchDetails)}</div>
                  <MoreInfo events={sortedEvents} />
                </div>
              </div>
      )
    }
    else{
       matchRow = (
            <div className="match w-clearfix show">
              <div className="numberbg" style={numberStyle}>
                <div className="numberplace">{matchIndex}</div>
              </div>
              <div className="contentcontainer w-clearfix">
                <div className="livescore">
                  <div className="scoreformatting">{match.homeClubScore}</div>
                  <div className="homecrest scoreformatting" style={homeClubCrestStyle}></div>
                  <div className="scoreformatting scoretime in-progress">
                    <div>{matchStatus}</div>
                    <div style={secondsStyle}></div>
                  </div>
                  <div className="awaycrest scoreformatting"  style={visitorClubCrestStyle}></div>
                  <div className="scoreformatting">{match.visitorClubScore}</div>
                </div>
                <div className="livenarrative narrative">{renderHTML(postMatchDetails)}</div>
                <MoreInfo events={sortedEvents} />
              </div>
            </div>
       )
    }
    return (
     <div className="match-container">{matchRow}</div>
    );
  }
}

export default MatchRow;
