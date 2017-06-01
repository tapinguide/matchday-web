import React, { Component } from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

import Crest from './Components/Crest';

import './css/wallpaper.css';
import './css/wallpaper-custom.css';

import logo from './images/tapin-logoV2B-11.svg';
import phone from './images/genericphone.png';

var axios = require("axios");
var clubsUrl = "http://matchday.tapinguide.com/api/clubswithcrests/?format=json";

class Backgrounds extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        clubs: [],
        loaded: false,
        crestUrl: '',
        displayColorPicker: false,
        color: {
            r: '56',
            g: '152',
            b: '246',
            a: '100',
        },
    };
  }

  setWallpaper(url) {
        this.setState({
            crestUrl: url
        })
    }
 
  componentDidMount() {
    var _this = this;
    axios
        .get(clubsUrl,
          {
            validateStatus: function (status) {
              return status < 500;
            }
          }
        )
        .then(function(result) {   
          var results = result.data;
          _this.setState({
            clubs: results,
            loaded: true
           });
        })
        .catch(function (error) {
          if (error.response) {
            // Response has been received from the server
            console.log(error.response.data); // => the response payload 
          }
      });
  }

handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {
    var _this = this;
    var crests = [];
    this.state.clubs.forEach(function(club, i) {
      crests.push(<Crest club={club} key={club.id} clubIndex={i} onSetParentWallpaper={_this.setWallpaper.bind(_this)} />);
    });
    
    var backgroundCrestStyle = {
      backgroundImage : "url(" + this.state.crestUrl + ")" 
    };

     var backgroundStyle = {
      backgroundColor : "#" + this.state.color
    };

    var deviceStyle = {
      backgroundImage : "url(" + phone + ")" 
    };

    const styles = reactCSS({
      'default': {
        color: {
          backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    var content = (
        <div className="body">
             <div className="_2 context">
    <a className="link-block-2 w-inline-block" href="/about">
      <div className="text-block">ABOUT this project</div>
    </a>
    <a className="link-block-3 w-inline-block" href="/contact">
      <div className="text-block">contact us</div>
    </a>
  </div>
  <div className="context">
    <div className="text-block-2">Pick your team, color and phone and we'll make you a background image.</div>
  </div>
  <div className="bodycontainer">
    <div className="menu" data-ix="menu">
      <a className="link-block w-inline-block" href="#"><img className="logo" src={logo} />
      </a>
    </div>
    <div className="maincontent">
      <div className="device" style={deviceStyle}>
        <div className="div-block-11" style={ styles.color }>
            <div className="crest selected-crest" style={backgroundCrestStyle}></div>
          <div className="div-block-8">
            <div className="div-block-6" style={ styles.color } onClick={ this.handleClick }>
                
            </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

            <div className="div-block-7">Background Color</div>
          </div>
        </div>
      </div>
      <div className="w-form">
        <form data-name="Email Form 2" id="email-form-2" name="email-form-2">
          <select className="select-field w-select" id="field" name="field">
            <option value="">Select your phone</option>
            <option value="First">First Choice</option>
            <option value="Second">Second Choice</option>
            <option value="Third">Third Choice</option>
          </select>
          <input className="submit-button-2 w-button" data-wait="Please wait..." type="submit" value="Download"></input>
        </form>
        <div className="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="w-form-fail">
          <div>Oops! Something went wrong while submitting the form</div>
        </div>
      </div>
      <div className="div-block-10"></div>
    </div>
    <div className="div-block-5">
      <div className="form-wrapper w-form">
        <form className="form" data-name="Email Form" id="email-form" name="email-form">
          <input className="text-field w-input" data-name="Email" id="email" maxLength="256" name="email" placeholder="Find your team" type="text"></input>
        </form>
        <div className="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="w-form-fail">
          <div>Oops! Something went wrong while submitting the form</div>
        </div>
      </div>
    </div>
    <div className="sidebar">
      {crests}
    </div>
  </div>
        </div>
    );
    return (
        <div>
          {content}
        </div>
    );
  }
}
 
export default Backgrounds;
