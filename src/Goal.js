import React from 'react';
import goal from './images/goal.svg'

class Goal extends React.Component {

    render() {
        var event = this.props.event;
        var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
        var player = event.player;
        var clubCrestUrl = event.club.crest;
        var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
        var goalStyle = {
           backgroundImage: "url(" + goal + ")"
        }

        var homeTeam = event.match.homeClub.name;
        var awayTeam = event.match.visitorClub.name;
        var homeTeamSubScore = 0;
        var awayTeamSubScore = 0;
        var result;
        if (event.eventType === 'goal') {
            result = event.result.replace('[','').replace(']','').split('-');
            homeTeamSubScore = result[0];
            awayTeamSubScore = result[1];
        }
        var cardSide;
        if(event.eventTeamName === homeTeam){
            cardSide = (
                <div className="incard">
                    <div className="cardcontainerhome">
                        <div className="homecrest" style={clubCrestStyle}></div>
                    </div>
                    <div className="hometextaction">
                        <div className="playernamecard">
                            {player}
                        </div>
                        <div className="goaltext">
                             {homeTeam} ({homeTeamSubScore}) {awayTeam} ({awayTeamSubScore})
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
						    {homeTeam} ({homeTeamSubScore}) {awayTeam} ({awayTeamSubScore})
					    </div>
			        </div>
                    <div className="cardcontaineraway">
                        <div className="awaycrest" style={clubCrestStyle}></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="card">
                <div className="cardheader green">
                    <div className="actionicon">
                        <div className="goal" style={goalStyle}></div>
                    </div>
                    <div className="headertitle">Goal</div>
                    <div className="gametime">{minute}'</div>
                </div>
                {cardSide}
            </div>
        )
    }
}

export default Goal;