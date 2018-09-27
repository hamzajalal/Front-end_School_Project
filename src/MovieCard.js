import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function MovieCard({ movie, deleteMovie }) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={movie.cover} alt="Movie Cover" />
      </div>
      <div className="content">
        <div className="header">{movie.title}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/movie/${movie._id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deleteMovie(movie._id)}>Delete</div>
        </div>
</div>
    </div>
  );
}

MovieCard.propTypes = {
  movie:PropTypes.object.isRequired,
  deleteMovie:PropTypes.func.isRequired
}