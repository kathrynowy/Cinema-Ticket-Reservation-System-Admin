import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
} from '../actionTypes';

import axios from 'axios';


export const getCinemasSuccess = (cinemas) => {
  return {
    type: GET_CINEMAS_SUCCESS,
    payload: cinemas
  }
}

export const getCinemasFailure = (error) => {
  return {
    type: GET_CINEMAS_FAILURE,
    payload: error.request.statusText
  }
}

export function getCinemasAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}

export function getMoviesAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`movies`);
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

export const getMoviesFailure = (error) => {
  return {
    type: GET_MOVIES_FAILURE,
    payload: error
  }
}

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

export function getSessionsAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`sessions`);
      dispatch(getSessionsSuccess(data));
    } catch (error) {
      dispatch(getSessionsFailure(error));
    }
  }
}

export function addMovieAsync(movie) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`movies`, movie);
      dispatch(addMovieSuccess(data.movie));
    } catch (error) {
      dispatch(addMovieFailure(error));
    }
  }
}


export const addMovieSuccess = movie => ({
  type: ADD_MOVIE_SUCCESS,
  payload: movie
})


export const addMovieFailure = error => ({
  type: ADD_MOVIE_FAILURE,
  payload: error
})

export const deleteCinemaAsync = id => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/cinemas/${id}`);
      dispatch(deleteCinemaSuccess(id));
    }
    catch (error) {
      dispatch(deleteCinemaFailure(error))
    }
  }
}

export const deleteCinemaSuccess = (id) => {
  return {
    type: DELETE_CINEMA_SUCCESS,
    payload: id
  }
}

export const deleteCinemaFailure = (error) => {
  return {
    type: DELETE_CINEMA_FAILURE,
    payload: error.request.statusText
  }
}
