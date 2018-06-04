import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { AUTH_TOKEN } from '../../constants';

import './style.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      this.props.history.push(`/resources`)
    }
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Login">
        <div className="Login-form">
          <h3>Área Privada</h3>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Insira seu email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <small id="emailHelp" className="form-text text-muted">Email usado pelo administrador</small>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => this._confirm()}
          >
            ENTRAR
          </button>
        </div>
      </div>
    );
  }

  _confirm = async () => {
    const { email, password } = this.state;
    const result = await this.props.loginMutation({
      variables: { email, password },
    });

    const { token } = result.data.login;

    if (token) {
      this._saveUserData(token);
      this.props.history.push(`/resources`)
    } else {
      this.setState({ email: '', password: '' });
    }
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(Login);
