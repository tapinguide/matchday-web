import React, { Component } from 'react';

// Assets
import logoCrest from '../../assets/images/logo.png';

class TableRow extends Component {
  render() {
    const {
      teamData,
      indicatorClass
    } = this.props;

    return (
      <li className={`table-row${indicatorClass ? ' ' + indicatorClass : ''}`}>
        <div className="table-row-inner">
          <div className="row-title">
            <div className="row-number">
              {teamData.position}.
            </div>
            <div className="club-info">
              <div className="club-crest">
                <img
                  src={teamData.club.crest ? teamData.club.crest : logoCrest}
                  alt={teamData.club.shortName}
                />
              </div>
              <div className="club-name">{teamData.club.name}</div>
            </div>
          </div>
          <div className="row-columns">
            <div className="columns-column">
              {teamData.matchesPlayed}
            </div>
            <div className="columns-column">
              {teamData.matchesWon}
            </div>
            <div className="columns-column">
              {teamData.matchesDrew}
            </div>
            <div className="columns-column">
              {teamData.matchesLost}
            </div>
            <div className="columns-column">
              {teamData.goalDifference}
            </div>
            <div className="columns-column">
              {teamData.points}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default TableRow;