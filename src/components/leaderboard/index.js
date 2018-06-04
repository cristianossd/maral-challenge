import React, { Component } from 'react';
import LeaderboardTable from '../leaderboard-table';
import logo from '../../assets/maral-challenge-logo.png';

const categories = [
  'Trio Scaled Feminino',
  'Trio Scaled Masculino',
  'Dupla Intermediário Feminino',
  'Dupla Intermediário Masculino',
  'RX Individual Masculino',
];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
    };

    this.setCategory = this.setCategory.bind(this);
  }

  setCategory({ target }) {
    this.setState({ selectedCategory: target.value });
  }

  render() {
    const { selectedCategory } = this.state;

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

              <div className="form-group">
                <label htmlFor="selectCategory">Acompanhe o Leaderboard</label>
                <select
                  className="form-control"
                  id="selectCategory"
                  defaultValue=""
                  onChange={this.setCategory}
                >
                  <option value="" disabled>Selecione a categoria</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <LeaderboardTable category={selectedCategory} />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
