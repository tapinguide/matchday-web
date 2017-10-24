import React from 'react';

class EventCard extends React.Component {
  state = {
    cardType: '',
    homeOrAway: ''
  }

  componentDidMount() {
    let { event } = this.props

    this.setHomeVsAway(event)
    this.setCardType(event)
  }

  setCardType(event) {
    this.setState(state => ({
      ...state,
      cardType: event.eventType
    }))
  }

  setHomeVsAway(event) {
    let homeOrAway = ''

    if(event.eventTeamName === event.match.homeClub.name){
      homeOrAway = 'home'
    }
    else
    {
      homeOrAway = 'away'
    }

    this.setState(state => ({
      ...state,
      homeOrAway: homeOrAway
    }))
  }

  renderCardTitle() {
    let { cardType } = this.state

    if(cardType === "yellowred") {
      return 'Second Yellow Card'
    }
    else if (cardType === "yellowcard") {
      return 'Yellow Card'
    } else if (cardType === "redcard") {
      return 'Red Card'
    } else if (cardType === "goal") {
      return 'Goal'
    }
  }

  renderClubCrest(clubCrestUrl) {
    return {
      backgroundImage: 'url(' + clubCrestUrl + ')'
    }
  }

  renderEventTime(event) {
    let minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10);

    return minute;
  }

  renderGoalSummary(cardType, event) {

    if (cardType === "goal") {
      let { homeClub, visitorClub } = event.match

      let result = event.result.replace('[','').replace(']','').split('-');
      let homeTeamSubScore = result[0];
      let awayTeamSubScore = result[1];

      return (
        <div className="goal-text">
          {homeClub.shortName} ({homeTeamSubScore}) {visitorClub.shortName} ({awayTeamSubScore})
        </div>
      )
    }
  }

  render() {
    let { event } = this.props
    let { cardType, homeOrAway } = this.state

    return (
      <div className={`event-card ${cardType}`}>
        <div className="event-card-header">
          <div className="actionicon action-icon-container">
            <div className="action-icon"></div>
          </div>
          <div className="event-card-header-title">
            {this.renderCardTitle()}
          </div>
          <div className="gametime">
            {this.renderEventTime(event)}'
          </div>
        </div>
        <div className={`incard ${homeOrAway}`}>
          <div className="incard-content">
            <div
              className="incard-crest crest"
              style={this.renderClubCrest(event.club.crest)}
            />
            <div className="incard-content-text-action">
              <div className="player-name-card">
                {event.player}
              </div>
              {this.renderGoalSummary(cardType, event)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCard;
