import {
  SIGN_IN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  LOGOUT_SUCCESS
} from '../actionTypes';
import axios from 'axios';
import { history } from '../App';
import { showSnackbar } from './snackbar'

axios.defaults.baseURL = 'http://localhost:8080/';


export const checkAuth = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const user = await axios.post(`user`);
      if (user.data.isAdmin)
        dispatch(checkAuthSuccess());
    } catch (error) {
      console.log(error);
    }
  }
}

export const checkAuthSuccess = () => ({
  type: CHECK_AUTH_SUCCESS
})

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS
})

export const logOut = () => {
  return async dispatch => {
    try {
      await axios.get(`logout`);
      localStorage.removeItem('token');
      history.push('/');
      dispatch(showSnackbar("Log out successfully!"));
      dispatch(logOutSuccess());
    } catch (error) {
      console.log(error);
    }
  }
}

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const signIn = userData => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`login`, { ...userData });

      if (data.isAdmin) {
        let token = data.token;

        token
          ? localStorage.setItem('token', token)
          : console.log('token not found');

        history.push('/cinemas');
        dispatch(showSnackbar("Sign in successfully!"));
        dispatch(signInSuccess());
      } else {
        alert('Please, enter correct data');
      }
    } catch (error) {
      dispatch(showSnackbar("Please, enter correct data!"));
    }
  }
}
