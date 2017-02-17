import React from 'react';
import InProgressRow from './InProgressRow';
import ScheduledRow from './ScheduledRow';
import CompleteRow from './CompleteRow';

class MatchRow extends React.Component {
  render() {
    var match = this.props.match;
    let matchRow = null;
    if(match.status.description == "Scheduled"){
      matchRow = <ScheduledRow match={match} />;
    }
    else if (match.status.description == "FT"){
      matchRow = <CompleteRow match={match} />;
    }
    else{
       matchRow = <InProgressRow match={match} />;
    }
    return (
     <div>{matchRow}</div>
    );
  }
}

export default MatchRow;