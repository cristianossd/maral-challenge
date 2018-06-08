import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CATEGORIES } from '../../constants';

import './style.css';

class EventsRanking extends Component {
  state = {
    category: null,
    eventOrder: null,
    generated: false,
  };

  render() {
    const { category, generated } = this.state;
    const events = [1, 2, 3, 4];

    return (
      <div className="EventsRanking">
        <div className="EventsRanking-form">
          <h3>Gerar ranking do evento/categoria</h3>
          {generated &&
            <p>Evento gerado para a categoria {category}!</p>
          }

          <div className="form-group">
            <label htmlFor="categoriesSelect">Selecione a categoria:</label>
            <select
              className="form-control"
              id="categoriesSelect"
              defaultValue=""
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option value="" disabled></option>
              {CATEGORIES.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventsSelect">Selecione o evento:</label>
            <select
              className="form-control"
              id="eventsSelect"
              defaultValue=""
              onChange={(e) => this.setState({ eventOrder: e.target.value })}
            >
              <option value="" disabled></option>
              {events.map((e, index) => (
                <option key={index} value={e}>{e}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => this._setEventRanking()}
          >
            GERAR RANKING DO EVENTO
          </button>

        </div>
      </div>
    );
  }

  _setEventRanking = async () => {
    const { category, eventOrder } = this.state;

    await this.props.setEventRankingMutation({
      variables: {
        category,
        order: parseInt(eventOrder, 10),
      },
    });

    this.setState({ generated: true });
    setTimeout(() => {
      this.setState({ generated: false });
    }, 2000);
  }
}

const SET_EVENT_RANKING_MUTATION = gql`
  mutation SetEventRankingMutation($category: String!, $order: Int!) {
    setEventRanking(category: $category, order: $order)
  }
`;

export default graphql(SET_EVENT_RANKING_MUTATION, { name: 'setEventRankingMutation' })(EventsRanking);
