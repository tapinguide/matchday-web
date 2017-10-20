import React from 'react';
import missedPK from './images/missedPK.svg'

export default class MissedPK extends React.Component {

    render() {
        console.log('MISSED PEN GOT THERE')
        var event = this.props.event;
        var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
        var player = event.player;
        var clubCrestUrl = event.club.crest;
        var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
        var missedPkStyle = {
           backgroundImage: "url(" + missedPK + ")"
        }

        var homeTeamShortName = event.match.homeClub.shortName;
        var awayTeamShortName = event.match.visitorClub.shortName;
        var homeTeamName = event.match.homeClub.name;
        var awayTeamName = event.match.visitorClub.name;
        var homeTeamSubScore = 0;
        var awayTeamSubScore = 0;
        if (event.eventType === 'pen miss') {
            if (event.eventTeamName === homeTeamName) {
                homeTeamSubScore = event.match.homeClubScore - 1;
                awayTeamSubScore = event.match.visitorClubScore;
            } else if (event.eventTeamName === awayTeamName){
                homeTeamSubScore = event.match.homeClubScore;
                awayTeamSubScore = event.match.visitorClubScore - 1;
            }
        }
        var cardSide;
        if(event.eventTeamName === event.match.homeClub.name){
            cardSide = (
                <div className="incard">
                    <div className="cardcontainerhome">
                        <div className="homecrest" style={clubCrestStyle}></div>
                    </div>
                    <div className="hometextaction goal">
                        <div className="playernamecard">
                            {player}
                        </div>
                        <div className="goaltext">
                             {homeTeamShortName} ({homeTeamSubScore}) {awayTeamShortName} ({awayTeamSubScore})
                        </div>
                    </div>
		        </div>
            )
        }
        else
        {
            cardSide = (
                <div className="incard">
                    <div className="awaytextaction awaygoal">
			            <div className="playernamecardaway">
			                {player}
			            </div>
					    <div className="goaltext away">
						    {homeTeamShortName} ({homeTeamSubScore}) {awayTeamShortName} ({awayTeamSubScore})
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
                <div className="event-card-header green">
                    <div className="actionicon">
                        <div className="goal" style={missedPkStyle}></div>
                    </div>
                    <div className="headertitle">Missed Penalty Kick</div>
                    <div className="gametime">{minute}'</div>
                </div>
                {cardSide}
            </div>
        )
    }
}
