import React from 'react';
import moment from 'moment';

class ScheduledRow extends React.Component {
  
  render() {
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
return (
      <div className="match w-clearfix">
      <div className="numberbg">
        <div className="numberplace">{match.sortOrder}</div>
      </div>
      <div className="contentcontainer w-clearfix">
        <div className="crestcontainer">

          <div className="homecrest" style={homeClubCrestStyle}></div>
          <div className="vs">VS</div>
          <div className="awaycrest" style={visitorClubCrestStyle}></div>
        </div>
        <div className="infocontainer">
          <div className="datetime">{matchDate}</div>
          <div className="narrative">{match.preMatchDetails}</div>
        </div>
      </div>
     </div>
    );
  }
}

export default ScheduledRow;