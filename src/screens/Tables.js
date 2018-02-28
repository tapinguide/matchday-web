import React, { Component } from 'react';

// Packages
import Loader from 'react-loader';
import axios from 'axios';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Table from '../components/Tables/Table';
import MLSTable from '../components/Tables/MLSTable';

// Assets
import logo from '../assets/images/tapin-logo.png';

// Tables API Configuration
const domain = "https://api.tapinguide.com/"

const mlsTableURL = domain + "/tables/?competition_id=33&format=json";
const ligaMXTableURL = domain + "/tables/?competition_id=34&format=json";
// Demo API for development:
// var matchesUrl = "https://api.tapinguide.demo.nordicdev.io/api/activematches/?format=json"

class Tables extends Component {
  state = {
    // tables: [{ id: 28 }, { id: 30 }, { id: 29 }, { id: 33 }], //, { id: 34 }],
    tables: {},
    loaded: false,
    bigtext: "Essential Tables",
  }

  componentDidMount() {
    let _this = this;
    axios.all([
      this.getTable(33),
      this.getTable(34),
      ]).then(axios.spread((mlsTableResult, ligaMXTableResult) => {

        let sortedMLS = this.sortTable(mlsTableResult.data)
        let sortedLigaMx = this.sortTable(ligaMXTableResult.data)

        _this.setState({
          tables: {
            ligaMx: sortedLigaMx,
            mls: sortedMLS
          },
          loaded: true,
        });
      }));
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
      bigtext,
      loaded
    } = this.state;

    return (
      <div className="wrapper wrapper-tables">
        <div className="info desktop-header">
          <div className="header-logo">
            <img alt="Tap In Guide Logo" src={logo} />
          </div>
          <div className="bigtext">
            <span>{bigtext}</span>
          </div>
          <div className="dateRangeText">
            <span>{
              // this.state.matchDateRange
            }</span>
          </div>
          <div className="contextblurb">
            <span>{/*renderHTML(this.state.contextBlurb)*/}</span>
          </div>
        </div>
        <Header
          bigtext={bigtext}
          // contextblurb={this.state.contextBlurb}
        />
        <Loader
          loadedClassName="tables-container"
          loaded={loaded} color="#5d5d5d"
        >
          <div className="tables">
            <div className="tables-column column-left">
              <MLSTable clubs={tables.mls} />
            </div>
            <div className="tables-column column-right">
            <Table tableTitle="Liga MX" clubs={tables.ligaMx} />
            </div>
            <Footer />
          </div>
        </Loader>
      </div>
    );
  }
}

export default Tables;