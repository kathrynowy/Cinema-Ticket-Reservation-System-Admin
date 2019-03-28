import {
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
  ADD_ROW,
  ADD_HALL,
  CLEAR_ROW,
  CLEAR_HALLS
} from '../actionTypes'

const initialState = {
  halls: [],
  rows: [],
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

    case ADD_ROW:
      return Object.assign({}, state, {
        rows: [...state.rows, action.payload]
      });

    case ADD_HALL:
      return Object.assign({}, state, {
        halls: [...state.halls, action.payload]
      });

    case CLEAR_ROW:
      return Object.assign({}, state, {
        rows: []
      })

    case CLEAR_HALLS:
      return Object.assign({}, state, {
        halls: []
      })

    default: return state;
  }
}
