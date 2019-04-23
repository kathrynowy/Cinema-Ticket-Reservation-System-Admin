import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  CLEAR_MOVIE,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_FAILURE,
  DELETE_MOVIE_FAILURE,
  DELETE_MOVIE_SUCCESS,
} from '../actionTypes';

import axios from 'axios';


export const deleteMovieAsync = id => {
  return async (dispatch) => {
    try {
      await axios.delete(`/movies/${id}`);
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

export const getMoviesAsync = () => {
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


export const addMovieAsync = (movie) => {
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

export const getMovieAsync = (id) => {
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

export const getMovieFailure = error => ({
  type: GET_MOVIE_FAILURE,
  payload: error
});

export const clearMovie = () => ({
  type: CLEAR_MOVIE
});
