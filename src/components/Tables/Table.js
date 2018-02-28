import React, { Component } from 'react';

// Components
import TeamRow from './TeamRow';

class Table extends Component {
  render() {
    const {
      tableTitle,
      clubs
    } = this.props;

    return (
      <div className="table">
        <div className="table-header">
          <h3>
            {tableTitle}
          </h3>
        </div>
        <ul className="table-list">
          <li className="table-row primary">
            <div className="table-row-inner">
              <div className="row-title" />
              <div className="row-columns">
                <div className="columns-column">
                  GP
                </div>
                <div className="columns-column">
                  W
                </div>
                <div className="columns-column">
                  D
                </div>
                <div className="columns-column">
                  L
                </div>
                <div className="columns-column">
                  GD
                </div>
                <div className="columns-column">
                  PTS
                </div>
              </div>
            </div>
          </li>
          {clubs.map((row, index) => {
            return <TeamRow teamData={row} key={row.club.shortName + index}/>;
          })}
        </ul>
      </div>
    );
  }
}

export default Table;