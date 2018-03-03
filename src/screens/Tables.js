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
      this.getTable(34), // Liga MX
      this.getTable(28), // EPL
      this.getTable(30), // La Liga
      this.getTable(29), // Bundesliga
      ]).then(axios.spread((mlsTableResult, ligaMXTableResult, eplTableResult, laLigaResult, bundesligaResult) => {

        let sortedMLS = this.sortTable(mlsTableResult.data)
        let sortedLigaMx = this.sortTable(ligaMXTableResult.data)
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
              <Table
                tableTitle="Premier League"
                clubs={tables.epl}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[]}
                relegationQualificationPositions={[]}
                relegationPositions={[18,19,20]}
              />
              <MLSTable clubs={tables.mls} />
              <Table
                tableTitle="Bundesliga"
                clubs={tables.bundesliga}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[6]}
                relegationQualificationPositions={[16]}
                relegationPositions={[17,18]}
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
            </div>
            <div className="tables-column tables-column-right">
              <MLSTable clubs={tables.mls} />
              <Table
                tableTitle="La Liga"
                clubs={tables.laLiga}
                championsLeaguePositions={[1,2,3,4]}
                europaLeaguePositions={[5]}
                europaQualificationPositions={[6]}
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