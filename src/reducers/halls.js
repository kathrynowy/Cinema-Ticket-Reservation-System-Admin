import {
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
} from '../actionTypes'

const initialState = {
  halls: [],
  errors: ''
}

export default function getHalls(state = initialState, action) {
  switch (action.type) {
    case ADD_HALL_SUCCESS:
      return Object.assign({}, state, {
        halls: [...state.halls, action.payload]
      });

    case ADD_HALL_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    default: return state;
  }
}
