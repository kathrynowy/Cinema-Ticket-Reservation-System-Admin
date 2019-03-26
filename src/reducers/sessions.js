import { GET_SESSIONS_SUCCESS, GET_SESSIONS_FAILURE } from '../actionTypes.js'

const initialState = {
  sessions: [],
  errors: []
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
    default: return state;
  }
}
