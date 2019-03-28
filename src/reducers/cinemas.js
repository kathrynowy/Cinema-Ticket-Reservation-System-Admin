import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
} from '../actionTypes'

const initialState = {
  cinemas: [],
  error: ''
}

export default function getCinemas(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS_SUCCESS:
      return Object.assign({}, state, {
        cinemas: action.payload
      });
    case GET_CINEMAS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case DELETE_CINEMA_SUCCESS:
      const newCinemas = state.cinemas.filter(cinema => cinema.id !== action.payload);
      return Object.assign({}, state, {
        cinemas: newCinemas
      });

    case DELETE_CINEMA_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    default: return state;
  }
}
