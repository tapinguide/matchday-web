import React, { Component } from 'react';

// Components
import TeamRow from './TeamRow';

class Table extends Component {

  state = {
    east: [],
    west: []
  }

  componentDidMount() {
    const { clubs } = this.props;

    this.sortAndSetTable(clubs);
  }

  sortAndSetTable(table) {
    table.sort(function(a, b) {
      return a.position - b.position;
    });

    let eastern = table.filter((row) => {
      return ['ATL', 'CHI', 'CLB', 'DCU', 'MTL', 'NE', 'NYC', 'NYR', 'OCS', 'PHI', 'TFC'].indexOf(row.club.shortName) > -1
    });

    let western = table.filter((row) => {
      return ['COL', 'DAL', 'HOU', 'LAG', 'LAFC', 'MIN', 'POR', 'RSL', 'SJE', 'SEA', 'SKC', 'VAN'].indexOf(row.club.shortName) > -1
    });
    this.setState({
      east: eastern,
      west: western
    })
  }

  render() {
    const {
      east,
      west
    } = this.state;

    return (
      <div className="table">
        <div className="table-header">
          <h3>
            Major League Soccer
          </h3>
        </div>
        <ul className="table-list">
          <li className="table-row primary">
            <div className="table-row-inner">
              <div className="row-title">
                Eastern
              </div>
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
          {east.map((row, index) => {
            return <TeamRow teamData={row} key={row.club.shortName + index}/>;
          })}
          <li className="table-row primary">
            <div className="table-row-inner">
              <div className="row-title">
                Western
              </div>
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
          {west.map((row, index) => {
            return <TeamRow teamData={row} key={row.club.shortName + index}/>;
          })}
        </ul>
      </div>
    );
  }
}

export default Table;