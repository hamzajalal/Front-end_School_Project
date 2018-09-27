export const SET_MOVIES = 'SET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const MOVIE_FETCHED = 'MOVIE_FETCHED';
export const MOVIE_UPDATED = 'MOVIE_UPDATED';
export const MOVIE_DELETED = 'MOVIE_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setMovies(movies) {
  return {
    type: SET_MOVIES,
    movies
  }
}

export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie
  }
}

export function movieFetched(movie) {
  return {
    type: MOVIE_FETCHED,
    movie
  }
}
export function movieUpdated(movie) {
  return {
    type: MOVIE_UPDATED,
    movie
  }
}

export function movieDeleted(movieId) {
  return {
    type: MOVIE_DELETED,
    movieId
  }
}


export function saveMovie(data) {
  return dispatch => {
    return fetch('/api/movies', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addMovie(data.movie)));
  }
}

export function updateMovie(data) {
  return dispatch => {
    return fetch(`/api/movies/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(movieUpdated(data.movie)));
  }
}
export function deleteMovie(id) {
  return dispatch => {
    return fetch(`/api/movies/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(movieDeleted(id)));
  }
}

export function fetchMovies() {
  return dispatch => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => dispatch(setMovies(data.movies)));
  }
}

export function fetchMovie(id) {
  return dispatch => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => dispatch(movieFetched(data.movie)));
  }
}
