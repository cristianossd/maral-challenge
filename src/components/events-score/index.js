import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose, withApollo } from 'react-apollo';
import { sortBy } from 'lodash';
import { CATEGORIES } from '../../constants';

import Header from '../header';

import './style.css';

class EventsScore extends Component {
  state = {
    category: null,
    team: '',
    teams: [],
    teamName: '',
    events: [],
    eventId: '',
    eventTime: null,
    eventReps: null,
    eventWeight: null,
  };

  render() {
    const {
      category,
      teams,
      teamName,
      events,
      eventId,
    } = this.state;

    return (
      <div>
        <Header />
        <div className="EventsScore">
          <div className="EventsScore-form">
            <h3>Atualizar score do evento</h3>

            <div className="form-group">
              <label htmlFor="categoriesSelect">Selecione a categoria:</label>
              <select
                className="form-control"
                id="categoriesSelect"
                defaultValue=""
                onChange={(e) => this._getTeams(e.target.value)}
              >
                <option value="" disabled></option>
                {CATEGORIES.map((c, index) => (
                  <option key={index} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {category && teams.length > 0 &&
              <div className="form-group">
                <label htmlFor="teamsSelect">Selecione a equipe:</label>
                <select
                  className="form-control"
                  id="teamsSelect"
                  defaultValue=""
                  onChange={(e) => this._getEvents(e.target.value)}
                >
                  <option value="" disabled></option>
                  {teams.map((t, index) => (
                    <option key={index} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
            }

            {teamName && events.length > 0 &&
              <div className="form-group">
                <label htmlFor="eventsSelect">Selecione evento:</label>
                <select
                  className="form-control"
                  id="eventsSelect"
                  defaultValue=""
                  onChange={(e) => this.setState({ eventId: e.target.value })}
                >
                  <option value="" disabled></option>
                  {events.map((e, index) => (
                    <option key={index} value={e.id}>{e.order}</option>
                  ))}
                </select>
              </div>
            }

            {eventId &&
              <div>
                <div className="form-group">
                  <label>Resultado do WOD:</label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="timeHelp"
                    placeholder="Tempo do WOD (MM:SS)"
                    onChange={e => this.setState({ eventTime: e.target.value })}
                  />
                  <small id="timeHelp" className="form-text text-muted">Inserir penalidade no tempo (ex: CAP excedido)</small>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="repsHelp"
                    placeholder="Repetições"
                    onChange={e => this.setState({ eventReps: e.target.value })}
                  />
                  <small id="repsHelp" className="form-text text-muted">Número de repetições</small>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="weightHelp"
                    placeholder="Peso levantado"
                    onChange={e => this.setState({ eventWeight: e.target.value })}
                  />
                  <small id="weightHelp" className="form-text text-muted">Para prova de maior peso levantado</small>
                </div>
              </div>
            }

            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={() => this._updateEvent()}
            >
              ATUALIZAR EVENTO
            </button>

          </div>
        </div>
      </div>
    );
  }

  _getTeams = async (category) => {
    const { data } = await this.props.client.query({
      query: LEADERBOARD_QUERY,
      variables: { category },
    });

    this.setState({ category, teams: data.leaderboard });
  }

  _getEvents = async (teamName) => {
    const { data } = await this.props.client.query({
      query: TEAM_QUERY,
      variables: { name: teamName },
    });

    const events = sortBy(data.team.events, (event) => event.order);
    this.setState({ teamName, events });
  }

  _updateEvent = async () => {
    const { teamName, eventId, eventTime, eventReps, eventWeight } = this.state;

    await this.props.updateEventMutation({
      variables: {
        teamName,
        id: eventId,
        time: eventTime,
        reps: parseInt(eventReps, 10),
        weight: parseInt(eventWeight, 10),
      },
    });

    this.setState({
      category: null,
      team: '',
      teams: [],
      teamName: '',
      events: [],
      eventId: '',
      eventTime: null,
      eventReps: null,
      eventWeight: null,
    });
  }
}

const LEADERBOARD_QUERY = gql`
  query LeaderboardQuery($category: String!) {
    leaderboard(category: $category) {
      id
      name
    }
  }
`;

const TEAM_QUERY = gql`
  query TeamQuery($name: String!) {
    team(name: $name) {
      events {
        id
        order
      }
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($teamName: String!, $id: ID!, $time: String, $reps: Int, $weight: Int) {
    updateEvent(teamName: $teamName, id: $id, time: $time, reps: $reps, weight: $weight) {
      id
    }
  }
`;

export default compose(
  withApollo,
  graphql(UPDATE_EVENT_MUTATION, { name: 'updateEventMutation' }),
)(EventsScore);
