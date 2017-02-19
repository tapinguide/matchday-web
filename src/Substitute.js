import React from 'react';
import subOn from './images/subon.svg';
import subOff from './images/suboff.svg';

class Substitute extends React.Component {
 
  render() {
    var event = this.props.event;
    var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
    var player = event.player;
    var subPlayer = event.assist;
    var clubCrestUrl = event.club.crest;    
    var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
    var subOnStyle = {
                backgroundImage: "url(" + subOn + ")"
            };
    var subOffStyle = {
                backgroundImage: "url(" + subOff + ")"
            };

    return (
        <div className="card">
            <div className="cardheader">
                <div className="gametime">{minute}'</div>
                <div className="headertitle">Substitute</div>
            </div>
            <div className="homecrest incard" style={clubCrestStyle}></div>
            <div className="subrow">
                <div className="subon" style={subOnStyle}></div>
                <div className="playernamecard subname">{player}</div>
            </div>
            <div className="subrow">
                <div className="off subon" style={subOffStyle}></div>
                <div className="playernamecard subname">{subPlayer}</div>
            </div>
            <div className="timeline"></div>
        </div>
    )
  }
}

export default Substitute;