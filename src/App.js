import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Leaderboard from './components/leaderboard';
import Login from './components/login';
import './assets/App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Leaderboard} />
            <Route exact path="/login" component={Login} />
          </Switch>
      </div>
    );
  }
}

export default App;
