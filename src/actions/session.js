import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_CINEMAS_BY_CITY_SUCCESS,
  GET_CINEMAS_BY_CITY_FAILURE,
  GET_HALLS_BY_CINEMA_SUCCESS,
  GET_HALLS_BY_CINEMA_FAILURE,
  ADD_TIME,
  DELETE_TIME,
  ADD_SESSION_SUCCESS,
  ADD_SESSION_FAILURE,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAILURE,
  CLEAR_TIMES
} from '../actionTypes';

import axios from 'axios';


export const addSessionAsync = (session) => {
  return async (dispatch) => {
    try {
      await axios.post(`sessions`, session);
    } catch (error) {
      dispatch(addSessionFailure(error));
    }
  }
}

export const clearTimes = () => {
  return {
    type: CLEAR_TIMES
  }
}

export const addSessionSuccess = session => ({
  type: ADD_SESSION_SUCCESS,
  payload: session
})

export const addSessionFailure = error => ({
  type: ADD_SESSION_FAILURE,
  payload: error
})

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
      const { data } = await axios.get(`cinemas?city=${city}`);
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

export const addTime = date => {
  return {
    type: ADD_TIME,
    payload: date
  }
}

export const deleteTime = index => {
  return {
    type: DELETE_TIME,
    payload: index
  }
}

export const deleteSessionAsync = id => {
  return async (dispatch) => {
    try {
      await axios.delete(`/sessions/${id}`);
      dispatch(deleteSessionSuccess(id));
    }
    catch (error) {
      dispatch(deleteSessionFailure(error))
    }
  }
}

export const deleteSessionSuccess = (id) => {
  return {
    type: DELETE_SESSION_SUCCESS,
    payload: id
  }
}

export const deleteSessionFailure = (error) => {
  return {
    type: DELETE_SESSION_FAILURE,
    payload: error.request.statusText
  }
}
