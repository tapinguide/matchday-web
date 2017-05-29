import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Matches from './Match/Matches';
import Backgrounds from './BackgroundGenerator/Backgrounds';
import About from './About';

class Main extends Component {
  render() {
    return (
        <div className="w-container">
            <Switch>
                <Route exact path='/' component={Matches}/>
                <Route path='/backgrounds' component={Backgrounds}/>
                <Route path='/about' component={About}/>
            </Switch>
        </div>
    );
  }
}
 
export default Main;
