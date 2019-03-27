import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  CLEAR_MOVIE,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_FAILURE
} from '../actionTypes.js';

const initialState = {
  movies: [],
  movie: {},
  errors: ''
}

export default function getMovies(state = initialState, action) {
  switch (action.type) {
    case EDIT_MOVIE_SUCCESS: {
      let newMovie = state.movies.find(movie => movie.id === action.payload.id);
      newMovie = action.payload;

      return Object.assign({}, state)
    }

    case EDIT_MOVIE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case CLEAR_MOVIE:
      return Object.assign({}, state, {
        movie: {}
      })

    case GET_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        movies: action.payload
      });

    case GET_MOVIES_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case GET_MOVIE_SUCCESS:
      return Object.assign({}, state);

    case GET_MOVIE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case ADD_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        movies: action.payload
      });

    case ADD_MOVIE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    default: return state;
  }
}
