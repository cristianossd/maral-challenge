import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import Team from '../team/';
import Spinner from '../spinner/';

import './style.css';

class LeaderboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;
    if (category !== this.props.category) {
      this._getLeaderboard(category);
    }
  }

  render() {
    const { loading, teams } = this.state;

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
            {teams.length > 0 &&
              teams.map((team, idx) => (
                <Team key={idx} pos={idx} attributes={team} />
              ))
            }
          </tbody>
        </table>

        {loading &&
          <Spinner />
        }
      </div>
    );
  }

  _getLeaderboard = async (category) => {
    this.setState({ loading: true, teams: [] });

    const { data } = await this.props.client.query({
      query: LEADERBOARD_QUERY,
      variables: { category },
    });


    this.setState({ teams: data.leaderboard, loading: false });
  }
}

const LEADERBOARD_QUERY = gql`
  query LeaderboardQuery($category: String!) {
    leaderboard(category: $category) {
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

export default withApollo(LeaderboardTable);
