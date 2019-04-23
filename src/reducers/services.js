import { ADD_SERVICE, CLEAR_SERVICES, DELETE_SERVICE, ADD_SERVICES, EDIT_SERVICE } from '../actionTypes.js';

const initialState = {
  allAdditionalServices: [],
}

export default function additionalServices(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      return Object.assign({}, state, {
        allAdditionalServices: [...state.allAdditionalServices, action.payload]
      });
    case ADD_SERVICES:
      return Object.assign({}, state, {
        allAdditionalServices: action.payload
      });
    case CLEAR_SERVICES:
      return Object.assign({}, state, {
        allAdditionalServices: []
      });
    case EDIT_SERVICE: {
      let newServices = state.allAdditionalServices.slice();;
      newServices[action.index] = action.service;
      return Object.assign({}, state, {
        allAdditionalServices: newServices
      });
    }
    case DELETE_SERVICE: {
      const newServices = state.allAdditionalServices.filter((row, index) => index !== action.payload);
      return Object.assign({}, state, {
        allAdditionalServices: newServices
      });
    }
    default: return state;
  }
}
