import types from './types';

const deleteProjectStart = () => {
  return {
    type:types.DELETE_PROJECT_START
  }
}

const deleteProjectSuccess = () => {
  return {
    type:types.DELETE_PROJECT_SUCCESS
  }
}

const deleteProjectError = (error) => {
    return {
      type:types.DELETE_PROJECT_ERROR
    }
}

export default {
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectError
}
