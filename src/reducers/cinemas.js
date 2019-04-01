import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
  ADD_CINEMA_SUCCESS,
  ADD_CINEMA_FAILURE,
  GET_CINEMA_SUCCESS,
  GET_CINEMA_FAILURE,
  CLEAR_CINEMA,
  EDIT_CINEMA_SUCCESS,
  EDIT_CINEMA_FAILURE,
  ADD_CINEMA_AND_HALLS_SUCCESS,
  SAVE_CINEMA_INFO,
  CLEAR_CINEMA_INFO
} from '../actionTypes'

const initialState = {
  cinemas: [],
  error: '',
  cinema: {},
  newCinema: {}
}

export default function getCinemas(state = initialState, action) {
  switch (action.type) {
    case EDIT_CINEMA_SUCCESS: {
      const newCinemas = state.cinemas.map(cinema => {
        if (cinema.id === action.payload.id) {
          cinema = action.payload;
        }
        return cinema;
      });
      return Object.assign({}, state, {
        cinemas: newCinemas
      })
    }

    case ADD_CINEMA_AND_HALLS_SUCCESS:
      return Object.assign({}, state, {
        cinemas: [...state.cinemas, action.payload],
      });

    case EDIT_CINEMA_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case SAVE_CINEMA_INFO:
      return Object.assign({}, state, {
        newCinema: { name: action.name, city: action.city }
      });

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

    case ADD_CINEMA_SUCCESS:
      return Object.assign({}, state, {
        cinemas: [...state.cinemas, action.payload]
      });

    case ADD_CINEMA_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case GET_CINEMA_SUCCESS:
      return Object.assign({}, state, {
        cinema: action.payload
      });

    case GET_CINEMA_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case CLEAR_CINEMA:
      return Object.assign({}, state, {
        cinema: {}
      })

    case CLEAR_CINEMA_INFO:
      return Object.assign({}, state, {
        newCinema: {}
      })

    default: return state;
  }
}
