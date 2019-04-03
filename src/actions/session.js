import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_CINEMAS_BY_CITY_SUCCESS,
  GET_CINEMAS_BY_CITY_FAILURE,
  GET_HALLS_BY_CINEMA_SUCCESS,
  GET_HALLS_BY_CINEMA_FAILURE
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


export const getHallsByCinemaId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`halls/cinema/${id}`);
      dispatch(getHallsSuccess(data));
    } catch (error) {
      dispatch(getHallsFailure(error));
    }
  }
}

export const getHallsSuccess = (halls) => {
  return {
    type: GET_HALLS_BY_CINEMA_SUCCESS,
    payload: halls
  }
}

export const getHallsFailure = (error) => {
  return {
    type: GET_HALLS_BY_CINEMA_FAILURE,
    payload: error
  }
}