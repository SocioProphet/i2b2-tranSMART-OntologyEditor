import axios from 'axios';
// import actions from './actions'
import config from '../../../config'
import {projetcsOperations} from '../../nav/duck/'

const deleteProject = (projectId) => (dispatch) => {
  console.log('delete',projectId);
  console.log(config.API_URL+"/projects2");
  axios.delete(config.API_URL+"/project/"+projectId)
    .then((response) => {
      dispatch(projetcsOperations.fetchAllProjects(config.API_URL+"/projects"))
    });
}

export default{
  deleteProject
}
