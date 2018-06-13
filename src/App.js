import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Leaderboard from './components/leaderboard';
import LeaderboardResources from './components/leaderboard-resources';
import Login from './components/login';
import GenerateTeams from './components/generate-teams';
import TeamsScore from './components/teams-score';
import EventsScore from './components/events-score';
import EventsRanking from './components/events-ranking';
import { AUTH_TOKEN } from './constants';

import './assets/App.css';

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="App">
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Leaderboard} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          {authToken && <Route exact path={`${process.env.PUBLIC_URL}/resources`} component={LeaderboardResources} />}
          {authToken && <Route exact path={`${process.env.PUBLIC_URL}/teams/generate`} component={GenerateTeams} />}
          {authToken && <Route exact path={`${process.env.PUBLIC_URL}/teams/score`} component={TeamsScore} />}
          {authToken && <Route exact path={`${process.env.PUBLIC_URL}/events/score`} component={EventsScore} />}
          {authToken && <Route exact path={`${process.env.PUBLIC_URL}/events/ranking`} component={EventsRanking} />}
        </Switch>
      </div>
    );
  }
}

export default App;
