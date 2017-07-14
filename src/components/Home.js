import React, { Component } from 'react';
import logo from '../images/tapin-logo-white.png';
import '../css/home.css';

export default class Home extends Component {
  render() {
    return (
        <div className="div-block" id="gradient">
            <div className="container">
                <img className="tapinlogo" src={logo}  />
                <div className="text-block">We're skipping the holiday in Mallorca and are headed straight into pre-season training. We'll be back for the beginning of the season in August with a totally brand new product. <span className="text-span">Sign up for updates below.</span>
            </div>
            <div className="form-wrapper w-form">
                <form action="//tapinguide.us14.list-manage.com/subscribe/post?u=14e98619ae4c42af11b4222bb&amp;amp;id=8e0497d99f" className="form" data-name="Email Form" id="email-form" method="post" name="email-form">
                <input className="text-field w-input" data-name="Email" id="email" maxLength="256" name="email" placeholder="Enter your email address" required="required" type="email" />
                <input className="submit-button w-button" data-ix="new-interaction" data-wait="Please wait..." type="submit" value="Submit" />
                </form>
                <div className="success-message w-form-done">
                <div className="text-block-2">Thanks! You're all signed up.</div>
                </div>
                <div className="error-message w-form-fail">
                <div>Oops! Something went wrong while submitting the form</div>
                </div>
            </div>
            </div>
        </div>
    );
  }
}
 