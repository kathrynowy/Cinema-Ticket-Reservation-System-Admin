import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actionTypes.js';


export const showSnackbar = (message) => {
  return {
    type: SHOW_SNACKBAR,
    message
  }
}

export const hideSnackbar = () => {
  return {
    type: HIDE_SNACKBAR
  }
}
