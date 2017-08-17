import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Matches from './Match/Matches';
import Wallpaper from './Wallpaper/Wallpaper';
import About from './About/About';
import Contact from './Contact';
import Privacy from './Privacy/Privacy';

class Main extends Component {
  render() {
    return (
            <Switch>
                <Route exact path='/' component={Matches}/>
                <Route path='/wallpaper' component={Wallpaper}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/privacy' component={Privacy}/>
            </Switch>
    );
  }
}
 
export default Main;
