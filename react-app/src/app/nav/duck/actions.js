import types from './types';




const fetchProjects = () => {
  return {
    type: types.FETCH_PROJECTS,
    projects: []
  }
};

const fetchProjectsSuccess = () => {
  return {
    type: types.FETCH_PROJECTS_SUCCESS,
    status:"success",
  }
};

const fetchProjectsError = (message) => {
  return {
    type: types.FETCH_PROJECTS_ERROR,
    message:message,
    status:"error",
  }
};

const parseProjects = (projects) => {
  return {
    type: types.PARSE_PROJECTS,
    projects: projects
  }
};

// const fetchAllProjects = (url) => {
//   return{
//       type: types.FETCH_ALL_PROJECTS,
//       payload: axios.get(url)
//   }
// };

const showCreateProjectModal = () => {
  // console.log("hey");
  return {
    type: types.SHOW_CREATE_PROJECT_MODAL,
    action:true
  }
}

const hideCreateProjectModal = () => {
  return {
    type: types.HIDE_CREATE_PROJECT_MODAL
  }
}

const createProject = () => {
  return {
    type: types.CREATE_PROJECTS
  }
}

const createProjectSuccess = () => {
  return {
    type: types.CREATE_PROJECTS_SUCCESS
  }
}

const createProjectError = (message) => {
  return {
    type: types.CREATE_PROJECTS_ERROR,
    message:message,
    status:"error",
  }
}

const setFileServerId = (fileServerId) => {
  return {
    type: types.SET_FILE_ID,
    fileId: fileServerId
  }
}

const showProjectVersionsModal = () => {
  // console.log("hey");
  return {
    type: types.SHOW_PROJECT_VERSIONS_MODAL
  }
}

const hideProjectVersionsModal = () => {
  return {
    type: types.HIDE_PROJECT_VERSIONS_MODAL
  }
}


export default {
  fetchProjects,
  fetchProjectsSuccess,
  fetchProjectsError,
  parseProjects,
  showCreateProjectModal,
  hideCreateProjectModal,
  createProject,
  createProjectSuccess,
  createProjectError,
  setFileServerId,
  showProjectVersionsModal,
  hideProjectVersionsModal

  // fetchAllProjects
}
