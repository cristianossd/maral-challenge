import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rp from 'request-promise';

import './style.css';

const NEW_SUBSCRIPTION_URL = 'https://script.google.com/macros/s/AKfycbxo3DsSlMTrvk-vtOcHeB-0k6rmxYlJrdsj34Qccn5BZGmI8fDv/exec';

const forms = {
  '1M': [
    { type: 'hidden', name: 'categoria', value: 'RX Individual Masculino', placeholder: '' },
    { type: 'text', name: 'atleta_1', placeholder: 'Nome do Atleta' },
    { type: 'email', name: 'atleta_1_email', placeholder: 'Email' },
  ],
  '2F': [
    { type: 'hidden', name: 'categoria', value: 'Dupla Intermediãrio Feminino', placeholder: '' },
    { type: 'text', name: 'equipe', placeholder: 'Nome da Equipe' },
    { type: 'email', name: 'atleta_1_email', placeholder: 'Email da Capitã' },
    { type: 'text', name: 'atleta_1', placeholder: 'Nome da Atleta 1' },
    { type: 'text', name: 'atleta_2', placeholder: 'Nome da Atleta 2' },
  ],
  '2M': [
    { type: 'hidden', name: 'categoria', value: 'Dupla Intermediário Masculino', placeholder: '' },
    { type: 'text', name: 'equipe', placeholder: 'Nome da Equipe' },
    { type: 'email', name: 'atleta_1_email', placeholder: 'Email do Capitão' },
    { type: 'text', name: 'atleta_1', placeholder: 'Nome do Atleta 1' },
    { type: 'text', name: 'atleta_2', placeholder: 'Nome do Atleta 2' },
  ],
  '3F': [
    { type: 'hidden', name: 'categoria', value: 'Trio Scaled Feminino', placeholder: '' },
    { type: 'text', name: 'equipe', placeholder: 'Nome da Equipe' },
    { type: 'email', name: 'atleta_1_email', placeholder: 'Email da Capitã' },
    { type: 'text', name: 'atleta_1', placeholder: 'Nome da Atleta 1' },
    { type: 'text', name: 'atleta_2', placeholder: 'Nome da Atleta 2' },
    { type: 'text', name: 'atleta_3', placeholder: 'Nome da Atleta 3' },
  ],
  '3M': [
    { type: 'hidden', name: 'categoria', value: 'Trio Scaled Masculino', placeholder: '' },
    { type: 'text', name: 'equipe', placeholder: 'Nome da Equipe' },
    { type: 'email', name: 'atleta_1_email', placeholder: 'Email do Capitão' },
    { type: 'text', name: 'atleta_1', placeholder: 'Nome do Atleta 1' },
    { type: 'text', name: 'atleta_2', placeholder: 'Nome do Atleta 2' },
    { type: 'text', name: 'atleta_3', placeholder: 'Nome do Atleta 3' },
  ],
};

class SubscriptionForm extends Component {
  static propTypes = {
    category: PropTypes.string,
    onFinish: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const node = document.querySelector('.SubscriptionForm');
    window.scrollTo(0, node.offsetTop + 110); // magic number
  }

  onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {};
    form.forEach((value, key) => {
      data[key] = value;
    });

    rp({
      uri: NEW_SUBSCRIPTION_URL,
      method: 'GET',
      body: data,
      json: true,
    }).then(res =>
      res.json()
    ).then(json => {
      console.log(json);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { category } = this.props;
    const form = forms[category];

    return (
      <div className="SubscriptionForm">
        <form onSubmit={this.onSubmit}>
          {form.map((input, index) => {
            return (
              <div className="form-group">
                <input
                  className="form-control"
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                />
              </div>
            );
          })}

          <button type="submit" className="btn btn-primary btn-lg btn-block">INSCREVER</button>
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
