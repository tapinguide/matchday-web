import React, { Component } from 'react';

// Components
import TeamRow from './TeamRow';

class Table extends Component {

  getIndicatorClass(position) {
    const {
      championsLeaguePositions,
      europaLeaguePositions,
      europaQualificationPositions,
      relegationQualificationPositions,
      relegationPositions,
    } = this.props;

    if (championsLeaguePositions.indexOf(position) > -1)
      {return 'champions-league'}
    else if (europaLeaguePositions.indexOf(position) > -1)
      {return 'europa-league'}
    else if (europaQualificationPositions.indexOf(position) > -1)
      {return 'europa-qualification'}
    else if (relegationQualificationPositions.indexOf(position) > -1)
      {return 'relegation-qualification'}
    else if (relegationPositions.indexOf(position) > -1)
      {return 'relegation'}
    else {return null}
  }

  renderTableKey() {
    const {
      championsLeaguePositions,
      europaLeaguePositions,
      europaQualificationPositions,
      relegationQualificationPositions,
      relegationPositions,
      tableTitle
    } = this.props

    return tableTitle === 'Liga MX'
    ? null
    : (
      <div className="table-key">
        { championsLeaguePositions.length > 0 &&
          <div className="table-key-item champions-league">
            Champions League
          </div>
        }
        { europaLeaguePositions.length > 0 &&
          <div className="table-key-item europa-league">
            Europa League
          </div>
        }
        { europaQualificationPositions.length > 0 &&
          <div className="table-key-item europa-qualification">
            Europa Qualification
          </div>
        }
        { relegationQualificationPositions.length > 0 &&
          <div className="table-key-item relegation-qualification">
            Relegation Qualification
          </div>
        }
        { relegationPositions.length > 0 &&
          <div className="table-key-item relegation">
            Relegation
          </div>
        }
      </div>
    )
  }

  render() {
    const {
      tableTitle,
      clubs,
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
            let indicatorClass = this.getIndicatorClass(index + 1)
            return (
              <TeamRow
                teamData={row}
                key={row.club.shortName + index}
                indicatorClass={indicatorClass}
              />
            )
          })}
        </ul>
        {this.renderTableKey()}
      </div>
    );
  }
}

export default Table;