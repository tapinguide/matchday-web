import React from 'react';
import moment from 'moment';
import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png'
import renderHTML from 'react-render-html';

class CompleteRow extends React.Component {
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
                <div className="numberbg" style={numberStyle}>
                  <div className="numberplace">{matchIndex}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="scoreformatting">{match.homeClubScore}</div>
                    <div className="homecrest scoreformatting" style={homeClubCrestStyle}></div>
                    <div className="scoreformatting scoretime">FT</div>
                    <div className="awaycrest scoreformatting" style={visitorClubCrestStyle}></div>
                    <div className="scoreformatting">{match.visitorClubScore}</div>
                  </div>
                  <div className="datetime">{matchDate}</div>
                  <div className="livenarrative livenarrativecomplete narrative">{renderHTML(postMatchDetails)}</div>
                  <MoreInfo events={sortedEvents} />
                </div>
              </div>
    );
  }
}

export default CompleteRow;