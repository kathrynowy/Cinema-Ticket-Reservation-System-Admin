import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_CINEMAS_BY_CITY_SUCCESS,
  GET_CINEMAS_BY_CITY_FAILURE
} from '../actionTypes.js'

const initialState = {
  sessions: [],
  cinemas: [],
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
    case GET_CINEMAS_BY_CITY_SUCCESS:
      return Object.assign({}, state, {
        cinemas: action.payload
      });
    case GET_CINEMAS_BY_CITY_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    default: return state;
  }
}
