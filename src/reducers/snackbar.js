import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actionTypes.js';

const initialState = {
  isSnackbarOpen: false,
  message: 'Warning!'
}

export default function snackbar(state = initialState, action) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return Object.assign({}, state, {
        isSnackbarOpen: true,
        message: action.message
      })
    case HIDE_SNACKBAR:
      return Object.assign({}, state, {
        isSnackbarOpen: false
      })

    default: return state;
  }
}
