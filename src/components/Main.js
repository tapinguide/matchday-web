import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Matches from './Match/Matches';
import Wallpaper from './Wallpaper/Wallpaper';
import About from './About';
import Contact from './Contact';
import Home from './Home';

class Main extends Component {
  render() {
    return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/matchday' component={Matches}/>
                <Route path='/wallpaper' component={Wallpaper}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
            </Switch>
    );
  }
}
 
export default Main;
