import {
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
  ADD_ROW,
  ADD_HALL,
  CLEAR_ROWS,
  CLEAR_HALLS,
  DELETE_NEW_HALL,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  DELETE_HALL_SUCCESS,
  DELETE_HALL_FAILURE,
  GET_HALL_SUCCESS,
  GET_HALL_FAILURE,
  ADD_ROWS,
  CLEAR_HALL,
  EDIT_HALL_SUCCESS,
  EDIT_HALL_FAILURE,
  DELETE_ROW,
  EDIT_ROW
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

    case ADD_ROW:
      return Object.assign({}, state, {
        rows: [...state.rows, action.payload]
      });

    case ADD_ROWS:
      return Object.assign({}, state, {
        rows: action.payload
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
          hall = action.payload;
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

    case CLEAR_ROWS:
      return Object.assign({}, state, {
        rows: []
      });

    case DELETE_ROW: {
      const newRows = state.hall.hall.filter((row, index) => index !== action.payload);
      return Object.assign({}, state, {
        hall: newRows
      });
    }

    case EDIT_ROW: {
      let newRows = state.rows;
      newRows[action.index] = action.row;
      return Object.assign({}, state, {
        rows: newRows
      });
    }

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
