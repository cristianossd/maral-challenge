import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CATEGORIES } from '../../constants';

import Header from '../header';

import './style.css';

class TeamsScore extends Component {
  state = {
    category: null,
    generated: false,
  };

  render() {
    const { category, generated } = this.state;

    return (
      <div>
        <Header />
        <div className="TeamsScore">
          <div className="TeamsScore-form">
            <h3>Gerar score final por categoria</h3>
            {generated &&
              <p>Ranking gerado para a categoria {category}!</p>
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

            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={() => this._setTeamsScore()}
            >
              GERAR SCORE DA CATEGORIA
            </button>

          </div>
        </div>
      </div>
    );
  }

  _setTeamsScore = async () => {
    const { category } = this.state;

    await this.props.setTeamsScoreMutation({
      variables: {
        category,
      },
    });

    this.setState({ generated: true });
    setTimeout(() => {
      this.setState({ generated: false });
    }, 2000);
  }
}

const SET_TEAMS_SCORE_MUTATION = gql`
  mutation SetTeamsScoreMutation($category: String!) {
    setTeamsScore(category: $category)
  }
`;

export default graphql(SET_TEAMS_SCORE_MUTATION, { name: 'setTeamsScoreMutation' })(TeamsScore);
