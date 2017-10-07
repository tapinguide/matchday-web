import React from 'react';
import subOn from './images/subon.svg';
import subOff from './images/suboff.svg';
import sub from './images/sub.svg';

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
    var subStyle = {
                backgroundImage: "url(" + sub + ")"
            };
    var homeTeam = event.match.homeClub.name;
    var cardSide;
    if(event.eventTeamName === homeTeam){
            cardSide = (
                <div className="incard">
                    <div className="cardcontainerhome">
                        <div className="homecrest" style={clubCrestStyle}></div>
                    </div>
                    <div className="hometextaction home">
                        <div className="subcontainer home">
                            <div className="subrow">
						        <div className="subon" style={subOnStyle}></div>
					        </div>
                            <div className="subrow">
                                <div className="off subon" style={subOffStyle}></div>
                            </div>
                        </div>
                        <div className="textcontainer">
					<div className="">
						<div className="playernamecard subname">{player}</div>
					</div>
					<div className="">
						<div className="playernamecard subname">{subPlayer}</div>
					</div>
				</div>
                    </div>
		        </div>
            )
        }
        else
        {
            cardSide = (
                <div className="incard">
			        <div className="awaytextaction away">
						<div className="textcontainer">
							<div className="">
								<div className="playernamecardaway subname">{player}</div>
							</div>
							<div className="">
								<div className="playernamecardaway subname">{subPlayer}</div>
							</div>
						</div>
						<div className="subcontainer away">
							<div className="subrow">
								<div className="subon away" style={subOnStyle}></div>
							</div>
							<div className="subrow">
								<div className="off subon away" style={subOffStyle}></div>
							</div>
						</div>
			    </div>
				<div className="cardcontaineraway">
					<div className="awaycrest" style={clubCrestStyle}></div>
				</div>
			</div>
            )
        }
    return (
        <div className="event-card">
            <div className="event-card-header">
                <div className="actionicon">
                    <div className="sub" style={subStyle}></div>
                </div>
                <div className="headertitle">Substitute</div>
                <div className="gametime">{minute}'</div>
            </div>
            {cardSide}
        </div>
    )
  }
}

export default Substitute;