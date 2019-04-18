import {
  ADD_SERVICE,
  ADD_SERVICES,
  CLEAR_SERVICES,
  DELETE_SERVICE,
  EDIT_SERVICE
} from '../actionTypes';


export const deleteService = (index) => {
  return {
    type: DELETE_SERVICE,
    payload: index
  }
}

export const editService = (index, service) => {
  return {
    type: EDIT_SERVICE,
    index,
    service
  }
}

export const addService = (service) => {
  return {
    type: ADD_SERVICE,
    payload: service
  }
}

export const addServices = (services) => {
  return {
    type: ADD_SERVICES,
    payload: services
  }
}

export const clearServices = () => {
  return {
    type: CLEAR_SERVICES,
  }
}
