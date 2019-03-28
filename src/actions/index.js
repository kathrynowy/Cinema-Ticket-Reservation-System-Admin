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
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
  CLEAR_MOVIE,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_FAILURE,
  DELETE_MOVIE_FAILURE,
  DELETE_MOVIE_SUCCESS,
  ADD_CINEMA_SUCCESS,
  ADD_CINEMA_FAILURE,
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
} from '../actionTypes';

import axios from 'axios';

export const deleteMovieAsync = id => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/movies/${id}`);
      dispatch(deleteMovieSuccess(id));
    }
    catch (error) {
      dispatch(deleteMovieFailure(error))
    }
  }
}

export const deleteMovieSuccess = (id) => {
  return {
    type: DELETE_MOVIE_SUCCESS,
    payload: id
  }
}

export const deleteMovieFailure = (error) => {
  return {
    type: DELETE_MOVIE_FAILURE,
    payload: error.request.statusText
  }
}

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

export function addCinemaAsync(cinema) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`cinemas`, cinema);
      dispatch(addCinemaSuccess(data));
    } catch (error) {
      dispatch(addCinemaFailure(error));
    }
  }
}

export const addCinemaSuccess = cinema => ({
  type: ADD_CINEMA_SUCCESS,
  payload: cinema
})

export const addCinemaFailure = error => ({
  type: ADD_CINEMA_FAILURE,
  payload: error
})

export function addHallAsync(hall) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`halls`, hall);
      dispatch(addHallSuccess(data));
    } catch (error) {
      dispatch(addHallFailure(error));
    }
  }
}

export const addHallSuccess = hall => ({
  type: ADD_HALL_SUCCESS,
  payload: hall
})

export const addHallFailure = error => ({
  type: ADD_HALL_FAILURE,
  payload: error
})

export function addMovieAsync(movie) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`movies`, movie);
      dispatch(addMovieSuccess(data));
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
