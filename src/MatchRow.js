import React from 'react';
import InProgressRow from './InProgressRow';
import ScheduledRow from './ScheduledRow';
import CompleteRow from './CompleteRow';
import './css/match.css';
class MatchRow extends React.Component {
  render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex + 1;
    let matchRow = null;
    if(match.status.description === "Scheduled"){
      matchRow = <ScheduledRow match={match} matchIndex={matchIndex} />;
    }
    else if (match.status.description === "FT" || match.status.description === "AET"){
      matchRow = <CompleteRow match={match} matchIndex={matchIndex} />;
    }
    else{
       matchRow = <InProgressRow match={match} matchIndex={matchIndex} />;
    }
    return (
     <div>{matchRow}</div>
    );
  }
}

export default MatchRow;