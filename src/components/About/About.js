import React, { Component } from "react";
import logo from '../../images/tapin-logo.png';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import curt from './images/curt.png';
import mike from './images/mike.png';
import clint from './images/clint.png';
import { Link } from 'react-router-dom';

import './css/about.css';

class Privacy extends Component {
  render() {
      var bigtext = "About";
      var smalltext = "";
    return (
         <div className="container-fluid">
            <div className="w-container w-container-matches">
              <div className="info desktop-header">
                <div className="logoname">
                  <img alt="Tapin Guide Logo" src={logo} />
                </div>
                <div className="bigtext">
                  <span>{bigtext}</span>
                </div>
              </div>
            <Header bigtext={bigtext} smalltext={smalltext} />
              <div className="matches-container">
                <div className="about">
                  <div className="as-football-fanatics">
                    As football fanatics, we felt overwhelmed trying to keep up with the beautiful game. So, we created the latest version of Tap In, a soccer calendar with context to help fans easily get the scoop on what happened in the world’s biggest matches, what’s coming up, and why it all matters.
                  </div>
                  <div className="contact">
                    We’d love to hear what you think and what would make Tap In better. <br />Drop us a line: 
                    <Link
                      className="contact-link"
                      to="mailto:curt@tapinguide.com"
                      target="_blank"
                    >curt@tapinguide.com</Link>
                  </div>
                  <div className="line"></div>
                  <div className="tapin-logo">
                    <img alt="Tapin Guide Logo" src={logo} />
                  </div>
                  <div className="detail">
                     Tap In Design is a digital product studio. We created the original Tap In Guide for the 2014 World Cup, receiving over 350,000 page views in one month. 
                     We’ve gone on to continue to evolve the Tap In product as well as collaborate with some of our favorite soccer media brands, including KICK and Howler Magazine. 
                     We’re always on the lookout for the next collaboration or project, get in touch: <Link
                      className="contact-link"
                      to="mailto:curt@tapinguide.com"
                      target="_blank"
                    >curt@tapinguide.com</Link>.
                  </div>
                  <div className="people">
                    <div className="person">
                      <div className="image">
                        <img alt="Tapin Guide" src={curt} />
                      </div>
                      <div className="text">
                        <strong>Curt Baker</strong> Strategy Lead. Defensive Midfielder. Strategist. Hoping for another Friendly Fires album.
                      </div>
                    </div>
                    <div className="person">
                      <div className="image">
                        <img alt="Tapin Guide" src={mike} />
                      </div>
                      <div className="text">
                        <strong>Mike Arney</strong> Design, UX and a bit of Front-end development. Nerd.. which is fine. Dad of Jámes.
                      </div>
                    </div>
                    <div className="person">
                      <div className="image">
                        <img alt="Tapin Guide" src={clint} />
                      </div>
                      <div className="text">
                        <strong>Clint McMahon</strong>Yadda yadda yadda
                      </div>
                    </div>
                  </div>
                   <div className="person-extra">
                      <strong>Alex Martinez</strong> and <strong>Jared Handra</strong> are the newest members of the Tap In squad, both taking on front end development and design duties.
                    </div>
                  <div className="line"></div>
                  <div className="medium">
                    Check out our series of conversations with soccer makers and creators. [link to Medium]
                  </div>
                </div>
                <div>
                  <Footer />
                </div>
              </div>

            </div>
          </div>

    );
  }
}

export default Privacy;
