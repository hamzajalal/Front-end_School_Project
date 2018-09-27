import React from 'react';
import MoviesList from './MoviesList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMovies, deleteMovie } from './actions';

class MoviesPage extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
}
  render() {
    return (
      <div>
        <h1>Movies List</h1>

        <MoviesList movies={this.props.movies} deleteMovie={this.props.deleteMovie}  />
      </div>
    );
  }
}

MoviesPage.propTypes = {
  movies:PropTypes.array.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps,{fetchMovies,deleteMovie})(MoviesPage);