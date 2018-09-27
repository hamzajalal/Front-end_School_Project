import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

export default function MoviesList({ movies, deleteMovie }) {
  const emptyMessage = (
    <p>There are no movies yet to display.</p>
  );

  const moviesList = (
    <div className="ui four cards">
    { movies.map(movie => <MovieCard movie={movie} key={movie._id} deleteMovie={deleteMovie} />) }
</div>
  );

  return (
    <div>
      {movies.length === 0 ? emptyMessage : moviesList}
    </div>
  );
}

MoviesList.propTypes = {
  movies:PropTypes.array.isRequired,
  deleteMovie:PropTypes.func.isRequired
}