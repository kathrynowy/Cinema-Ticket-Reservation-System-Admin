import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_CINEMAS_BY_CITY_SUCCESS,
  GET_CINEMAS_BY_CITY_FAILURE,
  GET_HALLS_BY_CINEMA_SUCCESS,
  GET_HALLS_BY_CINEMA_FAILURE,
  ADD_TIME,
  DELETE_TIME,
  ADD_SESSION_FAILURE,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAILURE,
  CLEAR_TIMES
} from '../actionTypes.js'

const initialState = {
  sessions: [],
  cinemas: [],
  halls: [],
  times: [],
  errors: ''
}

export default function getSessions(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return Object.assign({}, state, {
        sessions: action.payload
      });
    case GET_SESSIONS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });
    case DELETE_SESSION_SUCCESS: {
      const newSessions = state.sessions.filter(session => session.id !== action.payload);
      return Object.assign({}, state, {
        sessions: newSessions
      });
    }
    case DELETE_SESSION_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case GET_CINEMAS_BY_CITY_SUCCESS:
      return Object.assign({}, state, {
        cinemas: action.payload
      });
    case GET_CINEMAS_BY_CITY_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });
    case GET_HALLS_BY_CINEMA_SUCCESS:
      return Object.assign({}, state, {
        halls: action.payload
      });
    case ADD_TIME:
      return Object.assign({}, state, {
        times: [...state.times, action.payload]
      });
    case CLEAR_TIMES:
      return Object.assign({}, state, {
        times: []
      });
    case DELETE_TIME: {
      const newTimes = state.times.filter((time, i) => i !== action.payload)
      return Object.assign({}, state, {
        times: newTimes
      });
    }
    case GET_HALLS_BY_CINEMA_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case ADD_SESSION_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });
    default: return state;
  }
}
