import React from 'react';
import moment from 'moment';
import MoreInfo from './MoreInfo';

class CompleteRow extends React.Component {
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
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var postMatchDetails = match.preMatchDetails;

    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }
    return (
              <div className="match matchcomplete w-clearfix">
                <div className="numberbg">
                  <div className="numberplace">{match.sortOrder}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="homescore">{match.homeClubScore}</div>
                    <div className="homecrest homescore" style={homeClubCrestStyle}></div>
                    <div className="homescore scoretime">FT</div>
                    <div className="awaycrest homescore"  style={visitorClubCrestStyle}></div>
                    <div className="awayscore">{match.visitorClubScore}</div>
                  </div>
                  <div className="datetime">{matchDate}</div>
                  <div className="livenarrative livenarrativecomplete narrative">{postMatchDetails}</div>
                    <MoreInfo events={match.events} />
                </div>
              </div>
    );
  }
}

export default CompleteRow;