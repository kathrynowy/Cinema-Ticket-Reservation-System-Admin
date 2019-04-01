import { ADD_SERVICE, CLEAR_SERVICES, DELETE_SERVICE, ADD_SERVICES } from '../actionTypes.js';

const initialState = {
  additionalServices: [],
}

export default function additionalServices(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      return Object.assign({}, state, {
        additionalServices: [...state.additionalServices, action.payload]
      });
    case ADD_SERVICES:
      return Object.assign({}, state, {
        additionalServices: action.payload
      });
    case CLEAR_SERVICES:
      return Object.assign({}, state, {
        additionalServices: []
      });
    case DELETE_SERVICE: {
      const newServices = state.additionalServices.filter((row, index) => index !== action.payload);
      return Object.assign({}, state, {
        additionalServices: newServices
      });
    }
    default: return state;
  }
}
