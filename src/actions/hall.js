import {
  ADD_HALL_SUCCESS,
  ADD_HALL_FAILURE,
  ADD_HALL,
  CLEAR_HALLS,
  CLEAR_HALL,
  DELETE_NEW_HALL,
  GET_HALLS_SUCCESS,
  GET_HALLS_FAILURE,
  DELETE_HALL_SUCCESS,
  DELETE_HALL_FAILURE,
  GET_HALL_SUCCESS,
  GET_HALL_FAILURE,
  EDIT_HALL_SUCCESS,
  EDIT_HALL_FAILURE,
  EDIT_NEW_HALL
} from '../actionTypes';

import axios from '../configs/axios';


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
    type: EDIT_HALL_SUCCESS,
    payload: hall
  }
}

export const editHallFailure = (error) => {
  return {
    type: EDIT_HALL_FAILURE,
    payload: error.request.statusText
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

export const editNewHall = (hall, index) => ({
  type: EDIT_NEW_HALL,
  payload: hall,
  index
})

export const deleteHallAsync = hall => {
  return async (dispatch) => {
    try {
      await axios.delete(`/halls/${hall.id}`);
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

export const getHallsAsync = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinema/${id}/halls`);
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

export const addHallsAsync = (cinemaId, halls) => {
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

export const getHallAsync = (id) => {
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

export const clearHalls = () => ({
  type: CLEAR_HALLS
});

export const clearHall = () => ({
  type: CLEAR_HALL
});
