import { connect } from 'react-redux'
import ProjectVersionModal from './projectVersionModalComponent'
import {projetcsOperations} from '../duck'
import {projectDataOperations} from '../../tree/duck/'

const mapStateToProps = (state) => ({
  project:state.tree.treeData.project,
  project_versions:state.tree.treeData.project_versions,
  show:state.navBarData.projects.isVisibleVersionsModal,
})

const mapDispatchToProps = (dispatch) => ({
  handleClose:() => {
    dispatch(projetcsOperations.hideProjectVersionsModal())
  },
  onChangeVersion: (version,projectId) => {
    dispatch(projectDataOperations.initAndFetchVersionProject(projectId,version))
    dispatch(projetcsOperations.hideProjectVersionsModal())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectVersionModal)
