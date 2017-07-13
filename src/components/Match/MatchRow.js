import React from 'react';
import moment from 'moment';
import MoreInfo from './MoreInfo';
import rectangle from './images/rectangle.png';
import seconds from './images/seconds.svg';
import renderHTML from 'react-render-html';
import './css/match.css';

class MatchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }
  componentDidMount() {
    this.props.setMinHeight(this.refs.match.clientHeight)
  }
  expandCollapse(value) {
    this.setState({expanded: !value});
  }
  getClass(value, optionalClass){
      if(value){
          return "match w-clearfix has-expander expander-open" + ' ' + optionalClass;
      }
      else{
          return "match w-clearfix has-expander expander-closed" + ' ' + optionalClass;
      }
  }
  render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex + 1;
    var ref = 'match';
    let matchRow = null;
    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    var homeClubCrestUrl = match.homeClub.crest;
    var homeClubCrestStyle = {backgroundImage: 'url(' + homeClubCrestUrl + ')'};
    var visitorClubCrestUrl = match.visitorClub.crest;
    var visitorClubCrestStyle = {backgroundImage: 'url(' + visitorClubCrestUrl + ')'};
    var numberStyle = {backgroundImage: "url(" + rectangle + ")"};
    var secondsStyle = {height: "12px", backgroundPosition: "center top", backgroundRepeat: "no-repeat", backgroundImage: "url(" + seconds + ")"};

    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();
    var matchStatus = match.status.description;
    if(match.status.description === "In Progress"){
      matchStatus = match.timer + "'";
    }

    const matchRowStyle = {
      'minHeight': this.props.minHeight
    };

    var postMatchDetails = match.preMatchDetails;
    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }
    if(match.status.description === "Scheduled"){
      matchRow = (
        <div ref={ref} className="match matchscheduled w-clearfix">
          <div className="numberbg" style={numberStyle}>
            <div className="numberplace">{matchIndex}</div>
          </div>
          <div className="contentcontainer w-clearfix">
            <div className="crestcontainer">
              <div className="homecrest" style={homeClubCrestStyle}></div>
              <div className="vs">VS</div>
              <div className="awaycrest" style={visitorClubCrestStyle}></div>
            </div>
            <div className="infocontainer">
              <div className="datetime">{matchDate}</div>
              <div className="narrative">{renderHTML(match.preMatchDetails)}</div>
            </div>
          </div>
        </div>
      )
    }
    else if (match.status.description === "FT" || match.status.description === "AET"){
      matchRow = (
          <div ref={ref} className={this.getClass(this.state.expanded, 'matchcomplete')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
                <div className="numberbg" style={numberStyle}>
                  <div className="numberplace">{matchIndex}</div>
                </div>
                <div className="contentcontainer">
                  <div className="livescore">
                    <div className="scoreformatting">{match.homeClubScore}</div>
                    <div className="homecrest scoreformatting" style={homeClubCrestStyle}></div>
                    <div className="scoreformatting scoretime">
                        <div>FT</div>
                    </div>
                    <div className="awaycrest scoreformatting" style={visitorClubCrestStyle}></div>
                    <div className="scoreformatting">{match.visitorClubScore}</div>
                  </div>
                  {/*<div className="datetime">{matchDate}</div>*/}
                  <div className="livenarrative livenarrativecomplete narrative">{renderHTML(postMatchDetails)}</div>
                  <MoreInfo events={sortedEvents} expandedState={this.state.expanded}/>
                </div>
              </div>
      )
    }
    else{
       matchRow = (
            <div ref={ref} className={this.getClass(this.state.expanded, '')}
            onClick={() => this.expandCollapse(this.state.expanded)}>
              <div className="numberbg" style={numberStyle}>
                <div className="numberplace">{matchIndex}</div>
              </div>
              <div className="contentcontainer w-clearfix">
                <div className="livescore">
                  <div className="scoreformatting">{match.homeClubScore}</div>
                  <div className="homecrest scoreformatting" style={homeClubCrestStyle}></div>
                  <div className="scoreformatting scoretime in-progress">
                    <div>{matchStatus}</div>
                    <div style={secondsStyle}></div>
                  </div>
                  <div className="awaycrest scoreformatting"  style={visitorClubCrestStyle}></div>
                  <div className="scoreformatting">{match.visitorClubScore}</div>
                </div>
                <div className="livenarrative narrative">{renderHTML(postMatchDetails)}</div>
                <MoreInfo events={sortedEvents} expandedState={this.state.expanded}/>
              </div>
            </div>
       )
    }

    return (
     <div className="match-container" style={matchRowStyle}>{matchRow}</div>
    );
  }
}

export default MatchRow;
