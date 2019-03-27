import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  CLEAR_MOVIE,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_FAILURE
} from '../actionTypes';

import axios from 'axios';

export const editMovieAsync = (movie, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/movies/${id}`, movie);
      dispatch(editMovieSuccess(data));
    }
    catch (error) {
      dispatch(editMovieFailure(error))
    }
  }
}

export const editMovieSuccess = (movie) => {
  return {
    type: EDIT_MOVIE_SUCCESS,
    payload: movie
  }
}

export const editMovieFailure = (error) => {
  return {
    type: EDIT_MOVIE_FAILURE,
    payload: error.request.statusText
  }
}

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

export function getMovieAsync(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`movies/${id}`);
      dispatch(getMovieSuccess(data));
    } catch (error) {
      dispatch(getMovieFailure(error));
    }
  }
}

export const getMovieSuccess = movie => ({
  type: GET_MOVIE_SUCCESS,
  payload: movie
});

export const getMovieFailure = movie => ({
  type: GET_MOVIE_FAILURE,
  payload: movie
});


export const clearMovie = () => ({
  type: CLEAR_MOVIE
});
