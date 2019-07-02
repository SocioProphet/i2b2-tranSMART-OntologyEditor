import { connect } from 'react-redux'
import SideBar from './sideBarComponent'
import {projectDataOperations} from '../tree/duck/'
import {projetcsOperations} from './duck/'

const mapStateToProps = (state) => ({
  listClipBoard:state.tree.treeData.clipboard,
  listPattern:state.tree.treeData.pattern,
  data:state.tree.treeData.data,
  project:state.tree.treeData.project,
  returned_version:state.tree.treeData.returned_version,
  mode:state.tree.treeData.clipboardMode,
  update:state.tree.treeData.update
})

const mapDispatchToProps = (dispatch) => ({
  onSuppressClipboard : () => {
    dispatch(projectDataOperations.resetClipboardNode());
  },
  onSave: (projectId,treeData) => {
    dispatch(projectDataOperations.saveProject(treeData,'0-0',projectId))
  },
  onShowProjectDetail: (projectId) => {
    dispatch(projectDataOperations.fetchVersions(projectId));
    dispatch(projetcsOperations.showProjectVersionsModal());
  },
  buildCsv:(projectId,version) => {
    dispatch(projectDataOperations.buildCsv(projectId,version))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(SideBar)
