import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { CATEGORIES } from '../../constants';

import './style.css';

class GenerateTeams extends Component {
  state = {
    teams: '',
    category: '',
  };

  render() {
    const { category } = this.state;

    return (
      <div className="GenerateTeams">
        <div className="GenerateTeams-form">
          <h3>Gerar padrão de eventos</h3>

          <div className="form-group">
            <label htmlFor="categoriesSelect">Selecione a categoria:</label>
            <select
              className="form-control"
              id="categoriesSelect"
              defaultValue={category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option value="" disabled></option>
              {CATEGORIES.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="teamsText">Equipes (separados por vírgula)</label>
            <textarea
              className="form-control"
              id="teamsText"
              rows="3"
              onChange={(e) => this.setState({ teams: e.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => this._generate()}
          >
            GERAR EVENTOS
          </button>

        </div>
      </div>
    );
  }

  _generate = async () => {
    const { teams, category } = this.state;
    const splittedTeams = teams.split(',');
    const eventsOrder = [1, 2, 3, 4];

    splittedTeams.forEach(async team => {
      await this.props.createTeamMutation({
        variables: {
          name: team,
          members: '',
          category,
        },
      });

      eventsOrder.forEach(async order => {
        await this.props.createEventMutation({
          variables: {
            teamName: team,
            order,
          },
        });
      });
    });

    this.setState({ teams: '', category: '' });
  }
}

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($name: String!, $members: String!, $category: String!) {
    createTeam(name: $name, members: $members, category: $category) {
      id
      name
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation($teamName: String!, $order: Int!) {
    createEvent(teamName: $teamName, order: $order) {
      id
      order
    }
  }
`;

export default compose(
  graphql(CREATE_TEAM_MUTATION, { name: 'createTeamMutation' }),
  graphql(CREATE_EVENT_MUTATION, { name: 'createEventMutation' }),
)(GenerateTeams);
