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
    else if (cardType === "subst") {
      return 'Substitute'
    }
    else if (cardType === "pen miss") {
      return 'Missed Penalty Kick'
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

    if (cardType === "pen miss") {
      let { homeClub, visitorClub, homeClubScore, visitorClubScore, eventTeamName } = event.match

      var homeTeamName = homeClub.name;
      var awayTeamName = visitorClub.name;
      var homeTeamSubScore = 0;
      var awayTeamSubScore = 0;

      if (eventTeamName === homeTeamName) {
          homeTeamSubScore = homeClubScore - 1;
          awayTeamSubScore = visitorClubScore;
      } else if (eventTeamName === awayTeamName){
          homeTeamSubScore = homeClubScore;
          awayTeamSubScore = visitorClubScore - 1;
      }

      return (
        <div className="goal-text">
          {homeClub.shortName} ({homeTeamSubScore}) {visitorClub.shortName} ({awayTeamSubScore})
        </div>
      )
    }
  }

  renderPlayerNames = (cardType, playerOn, playerOff) => {
    if (cardType === 'subst') {
      return (
        <div className="sub-details">
          <div className="sub-details-indicators">
            <div className="sub-arrow sub-arrow-on"></div>
            <div className="sub-arrow sub-arrow-off"></div>
          </div>
          <div className="sub-details-players">
            <div className="player-name-card">
              {playerOn}
            </div>
            <div className="player-name-card">
              {playerOff}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="player-name-card">
          {playerOn}
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
              {this.renderPlayerNames(cardType, event.player, event.assist)}
              {this.renderGoalSummary(cardType, event)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCard;
