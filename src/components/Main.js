import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Matches from './Match/Matches';
import Wallpaper from './Wallpaper/Wallpaper';
import About from './About';
import Contact from './Contact';

class Main extends Component {
  render() {
    return (
       <div>
            <Switch>
                <Route exact path='/' component={Matches}/>
                <Route path='/wallpaper' component={Wallpaper}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
            </Switch>
        </div>
    );
  }
}
 
export default Main;
