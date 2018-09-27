import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import MoviesPage from './MoviesPage';
import MovieFormPage from './MovieFormPage';


const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/movies" label="Movies" />
          <ActiveLink activeOnlyWhenExact to="/movies/new" label="Add a new movie" />
        </div>

        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/new" component={MovieFormPage} />
        <Route path="/movies/:_id" component={MovieFormPage} />
      </div>
);
  }
}

export default App;
