import React, { Component } from 'react';
import SubscriptionForm from './components/subscription-form';

import logo from './assets/maral-challenge-logo.png';
import './assets/App.css';

const categories = [
  { label: 'Trio Scaled Feminino', value: '3F'},
  { label: 'Trio Scaled Mascluno', value: '3M'},
  { label: 'Dupla Intermediário Feminino', value: '2F'},
  { label: 'Dupla Intermediário Masculino', value: '2M'},
  { label: 'RX Individual Masculino', value: '1M'},
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      allowCategory: false,
      allowForm: false,
      formSubmitted: false,
    };

    this.showCategory = this.showCategory.bind(this);
    this.showForm = this.showForm.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  showCategory() {
    this.setState({
      allowCategory: true,
      allowForm: false,
    });
  }

  showForm({ target }) {
    this.setState({
      category: target.value,
      allowForm: true,
    });
  }

  onFinish() {
    this.setState({
      category: null,
      allowCategory: false,
      allowForm: false,
      formSubmitted: true,
    });
  }

  render() {
    const { category, allowCategory, allowForm, formSubmitted } = this.state;

    return (
      <div className="App">
        <div className="App-logo">
          <img src={logo} alt="Maral Challenge Logo" />
        </div>

        <div className="App-description">
          <h4>COMPETIÇÃO INTERNA</h4>
          <p>9 DE JUNHO, MARAL ARMAÇÃO, SALVADOR - BAHIA</p>

          <div className="row justify-content-md-center">
            <div className="col-md-auto col-lg-4 App-finished-subscriptions">
              INSCRIÇÕES ENCERRADAS!
            </div>
          </div>
        </div>

        <div className="App-forms">
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-lg-5">

              {allowCategory &&
                <div className="App-forms-select form-group">
                  <select
                    className="App-forms-select-category form-control"
                    id="categorySelect"
                    onChange={this.showForm}
                    defaultValue=""
                  >
                    <option value="" disabled>Qual sua categoria?</option>

                    {categories.map((campCategory, index) => {
                      return (
                        <option key={index} value={campCategory.value}>{campCategory.label}</option>
                      );
                    })}

                  </select>
                </div>
              }


              {allowForm &&
                <SubscriptionForm
                  category={category}
                  onFinish={this.onFinish}
                />
              }
            </div>
          </div>
        </div>

        {formSubmitted &&
          <div className="App-messages">
            <div className="row justify-content-md-center">
              <div className="col-md-auto col-lg-7">
                SUA <strong>INSCRIÇÃO</strong> FOI REALIZADA COM SUCESSO.
                O PAGAMENTO DEVE SER REALIZADO EM UMA DE
                NOSSAS SEDES (IMBUÍ OU ARMAÇÃO) PARA A
                CONFIRMAÇÃO DA SUA PARTICIPAÇÃO!
              </div>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default App;
