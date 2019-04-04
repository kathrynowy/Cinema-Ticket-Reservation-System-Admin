import {
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
  ADD_HALL,
  CLEAR_HALLS,
  DELETE_NEW_HALL,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  DELETE_HALL_SUCCESS,
  DELETE_HALL_FAILURE,
  GET_HALL_SUCCESS,
  GET_HALL_FAILURE,
  CLEAR_HALL,
  EDIT_HALL_SUCCESS,
  EDIT_HALL_FAILURE,
} from '../actionTypes'

const initialState = {
  halls: [],
  rows: [],
  hall: {},
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

    case GET_HALLS_SUCCESS:
      return Object.assign({}, state, {
        halls: action.payload
      });

    case GET_HALLS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case GET_HALL_SUCCESS:
      return Object.assign({}, state, {
        hall: action.payload
      });

    case GET_HALL_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case ADD_HALL:
      return Object.assign({}, state, {
        halls: [...state.halls, action.payload]
      });

    case DELETE_NEW_HALL: {
      const newHalls = state.halls.filter(hall => hall.name !== action.payload.name && hall.hall !== action.payload.hall)
      return Object.assign({}, state, {
        halls: newHalls
      });
    }

    case EDIT_HALL_SUCCESS: {
      const newHalls = state.halls.map(hall => {
        if (hall.id === action.payload.id) {
          return action.payload;
        }
        return hall;
      });
      return Object.assign({}, state, {
        halls: newHalls
      })
    }

    case EDIT_HALL_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case DELETE_HALL_SUCCESS:
      const newHalls = state.halls.filter(hall => hall.name !== action.payload.name && hall.hall !== action.payload.hall)
      return Object.assign({}, state, {
        halls: newHalls
      });

    case DELETE_HALL_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload
      });

    case CLEAR_HALLS:
      return Object.assign({}, state, {
        halls: []
      })

    case CLEAR_HALL:
      return Object.assign({}, state, {
        hall: {}
      })

    default: return state;
  }
}
