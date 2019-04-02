import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_CINEMAS_BY_CITY_SUCCESS,
  GET_CINEMAS_BY_CITY_FAILURE
} from '../actionTypes';

import axios from 'axios';


export const getSessionsSuccess = (sessions) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = (error) => {
  return {
    type: GET_SESSIONS_FAILURE,
    payload: error
  }
}

export const getSessionsAsync = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`sessions`);
      dispatch(getSessionsSuccess(data));
    } catch (error) {
      dispatch(getSessionsFailure(error));
    }
  }
}

export const getCinemasByCity = (city) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas/city/${city}`);
      dispatch(getCinemasByCitySuccess(data));
    } catch (error) {
      dispatch(getCinemasByCityFailure(error));
    }
  }
}

export const getCinemasByCitySuccess = cinemas => ({
  type: GET_CINEMAS_BY_CITY_SUCCESS,
  payload: cinemas
});

export const getCinemasByCityFailure = error => ({
  type: GET_CINEMAS_BY_CITY_FAILURE,
  payload: error
});
