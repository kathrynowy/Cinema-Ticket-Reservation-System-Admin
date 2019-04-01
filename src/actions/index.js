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
  ADD_ROW,
  ADD_HALL,
  CLEAR_ROWS,
  CLEAR_HALLS,
  CLEAR_HALL,
  DELETE_NEW_HALL,
  GET_CINEMA_SUCCESS,
  GET_CINEMA_FAILURE,
  CLEAR_CINEMA,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  DELETE_HALL_SUCCESS,
  DELETE_HALL_FAILURE,
  EDIT_CINEMA_SUCCESS,
  EDIT_CINEMA_FAILURE,
  GET_HALL_SUCCESS,
  GET_HALL_FAILURE,
  ADD_ROWS,
  ADD_CINEMA_AND_HALLS_SUCCESS,
  SAVE_CINEMA_INFO,
  CLEAR_CINEMA_INFO,
  ADD_SERVICE,
  CLEAR_SERVICES,
  DELETE_ROW
} from '../actionTypes';

import axios from 'axios';

export const addRow = (row) => {
  return {
    type: ADD_ROW,
    payload: row
  }
}

export const deleteRow = (index) => {
  return {
    type: DELETE_ROW,
    payload: index
  }
}

export const editRow = (index, row) => {
  return {
    type: DELETE_ROW,
    index,
    row
  }
}

export const addService = (service) => {
  return {
    type: ADD_SERVICE,
    payload: service
  }
}

export const clearCinemaInfo = () => {
  return {
    type: CLEAR_CINEMA_INFO,
  }
}

export const clearServices = () => {
  return {
    type: CLEAR_SERVICES,
  }
}

export const saveCinemaInfo = (name, city) => {
  return {
    type: SAVE_CINEMA_INFO,
    name,
    city
  }
}

export const editHallAsync = (hall, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/halls/${id}`, hall);
      dispatch(editHallSuccess(data));
    }
    catch (error) {
      dispatch(editHallFailure(error))
    }
  }
}

export const editHallSuccess = (hall) => {
  return {
    type: EDIT_MOVIE_SUCCESS,
    payload: hall
  }
}

export const editHallFailure = (error) => {
  return {
    type: EDIT_MOVIE_FAILURE,
    payload: error.request.statusText
  }
}

export const addRows = (rows) => {
  return {
    type: ADD_ROWS,
    payload: rows
  }
}

export const addHall = (hall) => ({
  type: ADD_HALL,
  payload: hall
})

export const deleteNewHall = (hall) => ({
  type: DELETE_NEW_HALL,
  payload: hall
})

export const deleteHallAsync = hall => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/halls/${hall.id}`);
      dispatch(deleteHallSuccess(hall));
    }
    catch (error) {
      dispatch(deleteHallFailure(error))
    }
  }
}

export const deleteHallSuccess = (id) => {
  return {
    type: DELETE_HALL_SUCCESS,
    payload: id
  }
}

export const deleteHallFailure = (error) => {
  return {
    type: DELETE_HALL_FAILURE,
    payload: error.request.statusText
  }
}

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

export function getHallsAsync(id) {
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
    type: GET_HALLS_SUCCESS,
    payload: halls
  }
}

export const getHallsFailure = (error) => {
  return {
    type: GET_HALLS_FAILURE,
    payload: error
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

export function addCinemaAsync(cinema, halls) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`cinemas-halls`, { cinema, halls });
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

export function editCinemaAsync(id, cinema) {
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

export function addHallsAsync(cinemaId, halls) {
  return async (dispatch) => {
    try {
      for (let i = 0; i < halls.length; i++) {
        if (halls[i].cinemaId) {
          const { data } = await axios.put(`halls/${(halls[i]).id}`, halls[i]);
          dispatch(addHallSuccess(data));
        } else {
          const hall = {
            cinemaId,
            hall: halls[i].hall,
            name: halls[i].name
          };
          const { data } = await axios.post(`halls`, hall);
          dispatch(addHallSuccess(data));
        }
      }
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

export function getCinemaAsync(id) {
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

export const getMovieFailure = error => ({
  type: GET_MOVIE_FAILURE,
  payload: error
});

export function getHallAsync(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`halls/${id}`);
      dispatch(getHallSuccess(data));
    } catch (error) {
      dispatch(getHallFailure(error));
    }
  }
}

export const getHallSuccess = hall => ({
  type: GET_HALL_SUCCESS,
  payload: hall
});

export const getHallFailure = error => ({
  type: GET_HALL_FAILURE,
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

export const clearMovie = () => ({
  type: CLEAR_MOVIE
});

export const clearRows = () => ({
  type: CLEAR_ROWS
});

export const clearHalls = () => ({
  type: CLEAR_HALLS
});

export const clearHall = () => ({
  type: CLEAR_HALL
});

export const clearCinema = () => ({
  type: CLEAR_CINEMA
});
