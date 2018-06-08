import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Header extends Component {
  render() {
    return (
      <div classNameName="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Maral Challenge</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/teams/generate">Equipes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events/score">Resultados</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events/ranking">Scores por Evento</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams/score">Ranking Geral</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
