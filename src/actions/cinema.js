import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  DELETE_CINEMA_SUCCESS,
  DELETE_CINEMA_FAILURE,
  ADD_CINEMA_SUCCESS,
  ADD_CINEMA_FAILURE,
  GET_CINEMA_SUCCESS,
  GET_CINEMA_FAILURE,
  CLEAR_CINEMA,
  EDIT_CINEMA_SUCCESS,
  EDIT_CINEMA_FAILURE,
  ADD_CINEMA_AND_HALLS_SUCCESS,
  SAVE_CINEMA_INFO,
  CLEAR_CINEMA_INFO,
  CLEAR_CINEMAS
} from '../actionTypes.js';

import axios from '../configs/axios';


export const clearCinemaInfo = () => {
  return {
    type: CLEAR_CINEMA_INFO,
  }
}

export const clearCinemas = () => {
  return {
    type: CLEAR_CINEMAS,
  }
}

export const saveCinemaInfo = (name, city) => {
  return {
    type: SAVE_CINEMA_INFO,
    name,
    city
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

export const getCinemasAsync = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}

export const addCinemaAsync = (cinema, halls) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`cinemas`, { cinema, halls });
      dispatch(addCinemaSuccess(data.cinema));
    } catch (error) {
      dispatch(addCinemaFailure(error));
    }
  }
}

export const addCinemaWithHallsSuccess = result => ({
  type: ADD_CINEMA_AND_HALLS_SUCCESS,
  payload: result
})

export const addCinemaSuccess = cinema => ({
  type: ADD_CINEMA_SUCCESS,
  payload: cinema
})

export const addCinemaFailure = error => ({
  type: ADD_CINEMA_FAILURE,
  payload: error
})

export const editCinemaAsync = (id, cinema) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/cinemas/${id}`, cinema);
      dispatch(editCinemaSuccess(data));
    } catch (error) {
      dispatch(editCinemaFailure(error));
    }
  }
}

export const editCinemaSuccess = cinema => ({
  type: EDIT_CINEMA_SUCCESS,
  payload: cinema
})

export const editCinemaFailure = error => ({
  type: EDIT_CINEMA_FAILURE,
  payload: error
})


export const deleteCinemaAsync = id => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`cinemas/${id}`);
      dispatch(deleteCinemaSuccess(id));
    }
    catch (error) {
      dispatch(deleteCinemaFailure(error))
    }
  }
}

export const getCinemaAsync = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas/${id}`);
      dispatch(getCinemaSuccess(data));
    } catch (error) {
      dispatch(getCinemaFailure(error));
    }
  }
}

export const getCinemaSuccess = cinema => ({
  type: GET_CINEMA_SUCCESS,
  payload: cinema
});

export const getCinemaFailure = error => ({
  type: GET_CINEMA_FAILURE,
  payload: error
});


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

export const clearCinema = () => ({
  type: CLEAR_CINEMA
});
