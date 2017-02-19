import React from 'react';

class YellowCard extends React.Component {
 
  render() {
    var event = this.props.event;
    var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
    var player = event.player;
    var clubCrestUrl = event.club.crest;
    var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
    return (
        <div className="card">
            <div className="cardheader yellow">
                <div className="gametime">{minute}'</div>
                <div className="headertitle">Yellow Card</div>
            </div>
            <div className="homecrest incard" style={clubCrestStyle}></div>
            <div className="playernamecard">{player}</div>
            <div className="timeline"></div>
        </div>
    )
  }
}

export default YellowCard;
