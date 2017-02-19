import React from 'react';
import MoreInfo from './MoreInfo';

class InProgressRow extends React.Component {
  render(){
    var match = this.props.match;
    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {
            backgroundImage: 'url(' + homeClubCrestUrl + ')'
        }
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {
            backgroundImage: 'url(' + visitorClubCrestUrl + ')'
        }

    var postMatchDetails = match.preMatchDetails;

    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }

    var matchStatus = match.status.description;
    if(match.status.description == "In Progress"){
      matchStatus = match.timer + "'";
    }

    return (
      <div className="match w-clearfix show">
        <div className="numberbg">
          <div className="numberplace">{match.sortOrder}</div>
        </div>
        <div className="contentcontainer w-clearfix">
          <div className="livescore">
            <div className="homescore">{match.homeClubScore}</div>
            <div className="homecrest homescore" style={homeClubCrestStyle}></div>
            <div className="homescore scoretime">{matchStatus}</div>
            <div className="awaycrest homescore"  style={visitorClubCrestStyle}></div>
            <div className="awayscore">{match.visitorClubScore}</div>
          </div>
          <div className="livenarrative narrative">{postMatchDetails}</div>
          <MoreInfo events={match.events} />
         </div>
      </div>
    );
  }
}

export default InProgressRow;