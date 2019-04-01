import { ADD_SERVICE, CLEAR_SERVICES } from '../actionTypes.js';

const initialState = {
  additionalServices: [],
}

export default function additionalServices(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      return Object.assign({}, state, {
        additionalServices: [...state.additionalServices, action.payload]
      });
    case CLEAR_SERVICES:
      return Object.assign({}, state, {
        additionalServices: []
      })
    default: return state;
  }
}
