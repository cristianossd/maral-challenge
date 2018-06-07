import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Leaderboard from './components/leaderboard';
import LeaderboardResources from './components/leaderboard-resources';
import Login from './components/login';
import GenerateTeams from './components/generate-teams';
import EventsScore from './components/events-score';
import { AUTH_TOKEN } from './constants';

import './assets/App.css';

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Leaderboard} />
          <Route exact path="/login" component={Login} />
          {authToken && <Route exact path="/resources" component={LeaderboardResources} />}
          {authToken && <Route exact path="/teams/generate" component={GenerateTeams} />}
          {authToken && <Route exact path="/events/score" component={EventsScore} />}
        </Switch>
      </div>
    );
  }
}

export default App;
