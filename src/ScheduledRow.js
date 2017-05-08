import React from 'react';
import moment from 'moment';
import rectangle from './images/rectangle.png'
import renderHTML from 'react-render-html';

class ScheduledRow extends React.Component {
  
  render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex;
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
return (
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
    );
  }
}

export default ScheduledRow;