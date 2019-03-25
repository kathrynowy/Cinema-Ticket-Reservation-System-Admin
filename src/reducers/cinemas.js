import { GET_CINEMAS_SUCCESS, GET_CINEMAS_FAILURE } from '../actionTypes'

const initialState = {
  cinemas: [],
  isErrored: false
}

export default function getCinemas(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS_SUCCESS:
      return Object.assign({}, state, {
        cinemas: action.payload
      });
    case GET_CINEMAS_FAILURE:
      return Object.assign({}, state, {
        isErrored: action.payload
      });
    default: return state;
  }
}
