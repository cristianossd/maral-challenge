import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Leaderboard from './components/leaderboard';
import LeaderboardResources from './components/leaderboard-resources';
import Login from './components/login';
import './assets/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Leaderboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resources" component={LeaderboardResources} />
        </Switch>
      </div>
    );
  }
}

export default App;
