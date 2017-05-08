import React from 'react';
import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png'
import renderHTML from 'react-render-html';

class InProgressRow extends React.Component {
  render(){
    var match = this.props.match;
    var matchIndex = this.props.matchIndex;
    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {
            backgroundImage: 'url(' + homeClubCrestUrl + ')'
        }
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {
            backgroundImage: 'url(' + visitorClubCrestUrl + ')'
        }
    var numberStyle = {
                backgroundImage: "url(" + rectangle + ")"
            }
    var postMatchDetails = match.preMatchDetails;

    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }

    var matchStatus = match.status.description;
    if(match.status.description === "In Progress"){
      matchStatus = match.timer + "'";
    }

    return (
      <div className="match w-clearfix show">
        <div className="numberbg" style={numberStyle}>
          <div className="numberplace">{matchIndex}</div>
        </div>
        <div className="contentcontainer w-clearfix">
          <div className="livescore">
            <div className="homescore">{match.homeClubScore}</div>
            <div className="homecrest homescore" style={homeClubCrestStyle}></div>
            <div className="homescore scoretime">{matchStatus}</div>
            <div className="awaycrest homescore"  style={visitorClubCrestStyle}></div>
            <div className="awayscore">{match.visitorClubScore}</div>
          </div>
          <div className="livenarrative narrative">{renderHTML(postMatchDetails)}</div>
          <MoreInfo events={sortedEvents} />
         </div>
      </div>
    );
  }
}

export default InProgressRow;