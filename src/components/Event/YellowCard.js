import React from 'react';
import card from './images/card.svg';
import yellowred from './images/yellowred.svg';

class YellowCard extends React.Component {

    render() {
        var event = this.props.event;
        var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);
        var player = event.player;
        var clubCrestUrl = event.club.crest;
        var clubCrestStyle = {
            backgroundImage: 'url(' + clubCrestUrl + ')'
        }
        var cardStyle = {};
        var cardType = 'Yellow Card';

        if(event.eventType === "yellowred"){
            cardStyle={
                backgroundImage: "url(" + yellowred + ")"
            }
            cardType = 'Second Yellow Card';
        }
        else{
            cardStyle={
                backgroundImage: "url(" + card + ")"
            }
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
            <div className="event-card">
                <div className="event-card-header yellow">
                    <div className="actionicon">
                        <div className="yellowcard" style={cardStyle}></div>
                    </div>
                    <div className="headertitle">{cardType}</div>
                    <div className="gametime">{minute}'</div>
                </div>
                {cardSide}
            </div>
        )
    }
}

export default YellowCard;
