import { combineReducers } from 'redux'
import types from './types';


const  intitialState = {
  projects : [],
  isVisiblecreateModal:false,
  isVisibleVersionsModal:false,
  fileId:""
}

const projectsReducer = ( state = intitialState, action) => {
  switch (action.type) {
  case types.FETCH_PROJECTS:
    return { ...state, projects: action.projects};
  case types.FETCH_PROJECTS_SUCCESS:
    return { ...state, status: action.status};
  // case types.FETCH_PROJECTS_ERROR:
  //   return { ...state, status: action.status, message:action.message};
  case types.PARSE_PROJECTS:
    return { ...state, projects: action.projects};
  case types.SHOW_CREATE_PROJECT_MODAL:
      return { ...state, isVisiblecreateModal: true};
  case types.HIDE_CREATE_PROJECT_MODAL:
      return { ...state, isVisiblecreateModal: false};
  case types.SHOW_PROJECT_VERSIONS_MODAL:
      return { ...state, isVisibleVersionsModal: true};
  case types.HIDE_PROJECT_VERSIONS_MODAL:
      return { ...state, isVisibleVersionsModal: false};
  case types.SET_FILE_ID:
      return { ...state, fileId: action.fileId};

   default:
    return state;
  }
}

const reducer = combineReducers( {
    projects: projectsReducer,

} );

export default reducer;
