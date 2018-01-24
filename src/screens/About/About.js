import React, { Component } from "react";
import { Link } from 'react-router-dom';

import logo from '../../assets/images/tapin-logo.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import curt from './images/curt.jpg';
import mike from './images/mike.jpg';
import clint from './images/clint.jpg';

class About extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    var bigtext = "About";
    var smalltext = "";

    return (
     <div className="container-fluid container-about">
        <div className="wrapper wrapper-matches">
          <div className="info desktop-header">
            <div className="header-logo">
              <Link to="/">
                  <img alt="Tapin Guide Logo" src={logo} />
                </Link>
            </div>
            <div className="bigtext">
              <span>{bigtext}</span>
            </div>
          </div>
          <Header bigtext={bigtext} smalltext={smalltext} />
          <div className="matches-container">
            <div className="about">
              <div className="about-us">
                <div className="about-us-header">
                  About
                </div>
                <p>
                There's more coverage of the beautiful game than ever, but even as football fanatics, we found ourselves having trouble keeping up. So, we created the latest version of Tap In.
                </p>
                <p>
                It’s a soccer calendar with context that helps fans follow global soccer’s essential matches. Quick previews to get you prepped for the weekend, live match data, and match recaps with highlights.
                </p>
              </div>
              <div className="contact">
                We’d love to hear what you think and what would make Tap In better. Drop us a line:&nbsp;
                <Link
                  className="contact-link"
                  to="mailto:curt@tapinguide.com"
                  target="_blank"
                  rel="noopener"
                >curt@tapinguide.com</Link>
              </div>
              <div className="line"></div>
              <div className="tapin-logo">
                <img alt="Tapin Guide Logo" src={logo} />
              </div>
              <div className="detail">
                 Tap In Design is a digital product studio. We created the original Tap In Guide to help new soccer fans follow the 2014 World Cup. We’ve gone on to continue to evolve the Tap In product, as well as collaborate with some of our favorite soccer media brands, including KICK and Howler Magazine. We’re always on the lookout for the next collaboration or project, get in touch: <Link
                  className="contact-link"
                  to="mailto:curt@tapinguide.com"
                  target="_blank"
                  rel="noopener"
                >curt@tapinguide.com</Link>.
              </div>
              <div className="people">
                <div className="person">
                  <div className="image">
                    <Link to="https://twitter.com/curtyb" target="_blank" rel="noopener">
                      <img alt="Curt" src={curt} />
                    </Link>
                  </div>
                  <div className="text">
                    <strong><Link to="https://twitter.com/curtyb" target="_blank" rel="noopener" className="contact-link">Curt Baker</Link></strong> Defensive Midfielder. Strategist. Hoping for another Friendly Fires album.
                  </div>
                </div>
                <div className="person">
                  <div className="image">
                    <Link to="https://twitter.com/mike_arney" target="_blank" rel="noopener">
                      <img alt="Mike" src={mike} />
                    </Link>
                  </div>
                  <div className="text">
                    <strong><Link to="https://twitter.com/mike_arney" target="_blank" rel="noopener" className="contact-link">Mike Arney</Link></strong> Design, UX and a bit of Front-end development. Nerd.. which is fine. Dad of Jámes.
                  </div>
                </div>
                <div className="person">
                  <div className="image">
                    <Link to="https://twitter.com/minnepixel" target="_blank" rel="noopener">
                      <img alt="Clint" src={clint} />
                    </Link>
                  </div>
                  <div className="text">
                    <strong><Link to="https://twitter.com/minnepixel" target="_blank" rel="noopener" className="contact-link">Clint McMahon</Link></strong> Code, soccer, Seinfeld quotes, yadda yadda yadda.
                  </div>
                </div>
              </div>
              <div className="person-extra">
                <strong><Link to="https://twitter.com/alx_mrtnz" target="_blank" rel="noopener" className="contact-link">Alex Martinez</Link></strong> and <strong><Link to="https://twitter.com/handrajs" target="_blank" rel="noopener" className="contact-link">Jared Handra</Link></strong> are the newest members of the Tap In squad, both taking on front end development and design duties.
              </div>
              <div className="line"></div>
              <div className="medium">
                Check out our <Link to="https://medium.com/tapinguide" target="_blank" rel="noopener" className="contact-link">series of conversations with soccer makers and creators</Link>.
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

export default About;
