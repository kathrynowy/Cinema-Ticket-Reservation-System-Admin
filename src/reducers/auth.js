import { SIGN_IN_SUCCESS, CHECK_AUTH_SUCCESS, LOGOUT_SUCCESS } from '../actionTypes'


const initialState = {
  isAdminLoggedIn: false,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isAdminLoggedIn: true
      });

    case CHECK_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAdminLoggedIn: true
      });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAdminLoggedIn: false
      });

    default: return state;
  }
}
