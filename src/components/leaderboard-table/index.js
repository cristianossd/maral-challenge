import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Team from '../team/';
import Spinner from '../spinner/';

import './style.css';

class LeaderboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
  }

  render() {
    const { leaderboardQuery } = this.props;

    return (
      <div className="LeaderboardTable table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipe</th>
              <th scope="col">Evento 1</th>
              <th scope="col">Evento 2</th>
              <th scope="col">Evento 3</th>
              <th scope="col">Evento 4</th>
              <th scope="col">Score Final</th>
            </tr>
          </thead>

          <tbody>
            {leaderboardQuery.feed &&
              leaderboardQuery.feed.map((team, idx) => (
                <Team key={idx} pos={idx} attributes={team} />
              ))
            }
          </tbody>
        </table>

        {leaderboardQuery && leaderboardQuery.loading &&
          <Spinner />
        }
      </div>
    );
  }
}

const LEADERBOARD_QUERY = gql`
  query LeaderboardQuery {
    feed {
      id
      name
      finalScore
      events {
        order
        time
        reps
        weight
        ranking
      }
    }
  }
`;

export default graphql(LEADERBOARD_QUERY, { name: 'leaderboardQuery' })(LeaderboardTable);
