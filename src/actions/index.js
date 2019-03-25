import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
} from '../actionTypes';

import axios from 'axios';
const url = "http://localhost:8080/";


export const getCinemasSuccess = (cinemas) => {
  return {
    type: GET_CINEMAS_SUCCESS,
    payload: cinemas
  }
}

export const getCinemasFailure = (isError) => {
  return {
    type: GET_CINEMAS_FAILURE,
    payload: isError
  }
}

export function getCinemasAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}

export function getMoviesAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}movies`);
      dispatch(getMoviesSuccess(data));
    } catch (error) {
      dispatch(getMoviesFailure(error));
    }
  }
}

export const getMoviesSuccess = (movies) => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: movies
  }
}

export const getMoviesFailure = (isError) => {
  return {
    type: GET_MOVIES_FAILURE,
    payload: isError
  }
}

export const getSessionsSuccess = (sessions) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = (isError) => {
  return {
    type: GET_SESSIONS_FAILURE,
    payload: isError
  }
}

export function getSessionsAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}sessions`);
      dispatch(getSessionsSuccess(data));
    } catch (error) {
      dispatch(getSessionsFailure(error));
    }
  }
}
