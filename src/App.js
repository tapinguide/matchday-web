import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

// Assets
import './assets/styles/styles.css';

// Screens
import Matches from './components/Match/Matches';
import Wallpaper from './screens/Wallpaper/Wallpaper';
import About from './screens/About/About';
import Contact from './screens/Contact';
import Privacy from './screens/Privacy/Privacy';
import Splash from './screens/Splash/Splash';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Matches}/>
        <Route path='/wallpaper' component={Wallpaper}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/privacy' component={Privacy}/>
        <Route path='/splash' component={Splash}/>
      </Switch>
    );
  }
}

export default App;
