import React, { Component } from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';

// Packages
import Loader from 'react-loader';
import axios from 'axios';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Match from '../components/Match/Match';
import MustReadWatch from '../components/MustReadWatch/MustReadWatch';

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
    mlsTable: [],
    ligaMXTable: [],
    loaded: false,
    bigtext: "Essential Tables",
  }

  componentDidMount() {
    let _this = this;
    axios.all([
      this.getMLSTable(),
      this.getLigaMXTable(),
      ]).then(axios.spread((mlsTableResult, ligaMXTableResult) => {

        let sortedMLS = this.sortTable(mlsTableResult.data)
        let sortedLigaMx = this.sortTable(ligaMXTableResult.data)

        _this.setState({
          mlsTable: sortedMLS,
          ligaMXTable: sortedLigaMx,
          loaded: true,
        });
      }));
  }

  getMLSTable(){
    return axios.get(mlsTableURL)
  }

  getLigaMXTable() {
    return axios.get(ligaMXTableURL)
  }

  sortTable(table) {
    table.sort(function(a, b) {
        return b.points - a.points;
    });

    return table;
  }

  render() {
    const {
      mlsTable,
      ligaMXTable,
      bigtext,
      loaded
    } = this.state;

    console.log('mlstable: ', mlsTable)
    console.log('LIGA MX: ', ligaMXTable)

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
                  {mlsTable.map((row, index) => {
                    return (
                      <li className="table-row" key={'row' + index}>
                        <div className="table-row-inner">
                          <div className="row-title">
                            {index + 1}. <span className="club-name">{row.club.name}</span>
                          </div>
                          <div className="row-columns">
                            <div className="columns-column">
                              {row.matchesPlayed}
                            </div>
                            <div className="columns-column">
                              {row.matchesWon}
                            </div>
                            <div className="columns-column">
                              {row.matchesDrew}
                            </div>
                            <div className="columns-column">
                              {row.matchesLost}
                            </div>
                            <div className="columns-column">
                              {row.goalDifference}
                            </div>
                            <div className="columns-column">
                              {row.points}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="tables-column column-right">
              <div className="table">
                <div className="table-header">
                  <h3>
                    Liga MX
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
                  {ligaMXTable.map((row, index) => {
                    return (
                      <li className="table-row" key={'row' + index}>
                        <div className="table-row-inner">
                          <div className="row-title">
                            {index + 1}. <span className="club-name">{row.club.name}</span>
                          </div>
                          <div className="row-columns">
                            <div className="columns-column">
                              {row.matchesPlayed}
                            </div>
                            <div className="columns-column">
                              {row.matchesWon}
                            </div>
                            <div className="columns-column">
                              {row.matchesDrew}
                            </div>
                            <div className="columns-column">
                              {row.matchesLost}
                            </div>
                            <div className="columns-column">
                              {row.goalDifference}
                            </div>
                            <div className="columns-column">
                              {row.points}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Footer />
          </div>
        </Loader>
      </div>
    );
  }
}

export default Tables;