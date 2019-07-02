import axios from 'axios';
import actions from './actions'
import config from '../../../config'


const fetchAllProjects = (apiUrl) => (dispatch) => {
  // var url = apiUrl+"s";
  var url = apiUrl;
  // console.log(url);
  dispatch(actions.fetchProjects())
  axios.get(url)
    .then((response) => {
      // console.log('response',response);
      dispatch(actions.parseProjects(response.data))
      dispatch(actions.fetchProjectsSuccess())
    })
    .catch(error => {
        dispatch(actions.fetchProjectsError(error));
      });

  };

  const showCreateProjectModal = () => (dispatch) => {
    dispatch(actions.showCreateProjectModal());
  }

  const hideCreateProjectModal = () => (dispatch) => {
    dispatch(actions.hideCreateProjectModal());
  }

  const showProjectVersionsModal = () => (dispatch) => {
    dispatch(actions.showProjectVersionsModal());
  }

  const hideProjectVersionsModal = () => (dispatch) => {
    dispatch(actions.hideProjectVersionsModal());
    dispatch(actions.setFileServerId(""))
  }

  const createProject = (project_name,project_description,fileId) => (dispatch) => {
      dispatch(actions.createProject());
      let tree={};
      tree.text="empty project";
      tree.data={};
      tree.data.varName="empty project";

      axios.post(config.API_URL+'/project/new',{
        name : project_name,
        description:project_description,
        current_version:0,
        access_id:fileId
      })
      .then((response) => {
        // console.log('responseAdd',response);
        dispatch(actions.createProjectSuccess())
        dispatch(fetchAllProjects(config.API_URL+"/projects"))
      })
      .catch(error => {
        dispatch(actions.createProjectError(error));
      });
  }

  const setFileServerId = (fileServerId) => (dispatch) => {
    dispatch(actions.setFileServerId(fileServerId));
  }




export default {
  fetchAllProjects,
  showCreateProjectModal,
  hideCreateProjectModal,
  createProject,
  setFileServerId,
  showProjectVersionsModal,
  hideProjectVersionsModal
}
