import React, { Component } from 'react';
import { AUTH_TOKEN } from '../../constants';

class LeaderboardResources extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (!authToken) return null;

    return (
      <div>Private</div>
    );
  }
}

export default LeaderboardResources;
