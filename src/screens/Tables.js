import React, { Component } from 'react';

// Packages
import Loader from 'react-loader';
import axios from 'axios';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Table from '../components/Tables/Table';
import MLSTable from '../components/Tables/MLSTable';

class Tables extends Component {
  state = {
    // tables: [{ id: 28 }, { id: 30 }, { id: 29 }, { id: 33 }], //, { id: 34 }],
    tables: {},
    loaded: false,
    bigText: "Essential Tables",
    parentLoaded: false
  }

  componentDidMount() {
    let _this = this;

    axios.all([
      this.getTable(33), // MLS
      this.getTable(34), // Liga MX Tap In API Table,
      this.getLigaMXPositionTable(), // Liga MX Football API Table
      this.getTable(28), // EPL
      this.getTable(30), // La Liga
      this.getTable(29), // Bundesliga
      ]).then(axios.spread((mlsTableResult, ligaMXTapInAPI, ligaMXFootballAPI, eplTableResult, laLigaResult, bundesligaResult) => {

        let combinedLigaMXTable = this.getCombinedLigaMXTable(ligaMXTapInAPI.data, ligaMXFootballAPI.data)

        let sortedMLS = this.sortTable(mlsTableResult.data)
        let sortedLigaMx = this.sortTable(combinedLigaMXTable)
        let sortedEpl = this.sortTable(eplTableResult.data)
        let sortedLaLiga = this.sortTable(laLigaResult.data)
        let sortedBundesliga = this.sortTable(bundesligaResult.data)

        _this.setState({
          tables: {
            ligaMx: sortedLigaMx,
            mls: sortedMLS,
            epl: sortedEpl,
            laLiga: sortedLaLiga,
            bundesliga: sortedBundesliga
          },
          loaded: true,
        });
      }));

    this.setStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateFromProps(nextProps);
  }

  setStateFromProps(props) {
    const {
      contextBlurb,
      matchDateRange,
      parentLoaded
    } = props;

    this.setState({
      contextBlurb,
      matchDateRange,
      parentLoaded
    })
  }

  getTable(tableId) {
    return axios.get(`https://api.tapinguide.com/tables/?competition_id=${tableId}&format=json`)
  }

  getLigaMXPositionTable() {
    return axios.get('http://api.football-api.com/2.0/standings/1308?Authorization=565ec012251f932ea400000156a4f0d438f441995b735d2c968fcc0b&format=json')
  }

  getCombinedLigaMXTable(tapInAPITable, footballAPITable) {
    let filteredSeasonTable = footballAPITable.filter(team => {
      return team.stage_id === '13081116'
    })

    return filteredSeasonTable.map((team) => {
      let clubData = this.getAdditionalTeamData(team.team_id, tapInAPITable)

      team.club = clubData

      return {
        club: clubData,
        goalDifference: team.gd,
        goalsAllowed: team.overall_ga,
        goalsScored: team.overall_gs,
        matchesDrew: team.overall_d,
        matchesLost: team.overall_l,
        matchesPlayed: team.overall_gp,
        matchesWon: team.overall_w,
        points: team.points,
        position: team.position,
        recentForm: team.recent_form,
        season: team.season,
      }
    })
  }

  getAdditionalTeamData(id, ligaMXTableResult) {
    let selectedTeam = ligaMXTableResult.filter(team => {
      return team.club.footballAPIId === parseInt(id, 10)
    })

    return selectedTeam[0].club
  }

  sortTable(table) {
    table.sort(function(a, b) {
      return a.position - b.position;
    });

    return table;
  }

  render() {
    const {
      tables,
      bigText,
      loaded,
      matchDateRange
    } = this.state;

    const { contextBlurb } = this.props;

    return (
      <div className="wrapper wrapper-tables">
        <Header
          bigText={bigText}
          contextBlurb={contextBlurb}
          matchDateRange={matchDateRange}
        />
        <Loader
          loadedClassName="tables-container"
          loaded={loaded && this.props.parentLoaded} color="#5d5d5d"
        >
          <div className="tables">
            <div className="tables-column tables-column-left">
              <MLSTable clubs={tables.mls} />
              <Table
                tableTitle="Liga MX"
                clubs={tables.ligaMx}
                championsLeaguePositions={[]}
                europaLeaguePositions={[]}
                europaQualificationPositions={[]}
                relegationQualificationPositions={[]}
                relegationPositions={[]}
              />
              <Table
                tableTitle="La Liga"
                clubs={tables.laLiga}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[6]}
                relegationQualificationPositions={[]}
                relegationPositions={[18,19,20]}
              />
              <Table
                tableTitle="Premier League"
                clubs={tables.epl}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[]}
                relegationQualificationPositions={[]}
                relegationPositions={[18,19,20]}
              />
              <Table
                tableTitle="Bundesliga"
                clubs={tables.bundesliga}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[6]}
                relegationQualificationPositions={[16]}
                relegationPositions={[17,18]}
              />
            </div>
            <div className="tables-column tables-column-right">
              <Table
                tableTitle="Liga MX"
                clubs={tables.ligaMx}
                championsLeaguePositions={[]}
                europaLeaguePositions={[]}
                europaQualificationPositions={[]}
                relegationQualificationPositions={[]}
                relegationPositions={[]}
              />
              <Table
                tableTitle="Premier League"
                clubs={tables.epl}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[]}
                relegationQualificationPositions={[]}
                relegationPositions={[18,19,20]}
              />
            </div>
            <Footer />
          </div>
        </Loader>
      </div>
    );
  }
}

export default Tables;