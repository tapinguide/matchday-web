import React from 'react';
import card from './images/card.svg'
class RedCard extends React.Component {

    render() {
        var event = this.props.event;
        var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
        var player = event.player;
        var clubCrestUrl = event.club.crest;
        var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
        var cardStyle = {
           backgroundImage: "url(" + card + ")"
        }
        var homeTeam = event.match.homeClub.name;
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
                    </div>
		        </div>
            )
        }
        else
        {
            cardSide = (
                <div className="incard">
			        <div className="awaytextaction">
			            <div className="playernamecardaway">
			                {player}
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
                <div className="cardheader red">
                    <div className="actionicon">
                        <div className="redcard" style={cardStyle}></div>
                    </div>
                    <div className="headertitle">Red Card</div>
                    <div className="gametime">{minute}'</div>
                </div>
                {cardSide}
            </div>
        )
    }
}

export default RedCard;
