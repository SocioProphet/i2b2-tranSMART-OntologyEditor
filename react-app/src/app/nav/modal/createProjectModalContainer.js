import { connect } from 'react-redux'
import ProjectModal from './createProjectModalComponent'
import {projetcsOperations} from '../duck'

const mapStateToProps = (state) => ({
  show:state.navBarData.projects.isVisiblecreateModal,
  fileId:state.navBarData.projects.fileId
})

const mapDispatchToProps = (dispatch) => ({
  handleClose:() => {
    dispatch(projetcsOperations.hideCreateProjectModal())
  },
  createProject:(project_name,project_description,fileId) => {
    dispatch(projetcsOperations.createProject(project_name,project_description,fileId))
    dispatch(projetcsOperations.hideCreateProjectModal())
  },
  fileProcessed:(error,file) => {
    dispatch(projetcsOperations.setFileServerId(file.serverId))
  },
  fileRemoved:(error,file) => {
    console.log(error,file);
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectModal)
