import { connect } from 'react-redux'
import TreeModal from './modalComponent'
import {projectDataOperations} from '../duck'


const mapStateToProps = (state) => ({
  show:state.tree.treeData.editModalShow,
  data:state.tree.treeData.editModalData,
  type:state.tree.treeData.typeModal,
})

const mapDispatchToProps = (dispatch) => ({
  handleClose:() => {
    dispatch(projectDataOperations.modalCloseShow())
    dispatch(projectDataOperations.modalDataClear())
  },
  updateNodeName:(nodeId,label) => {
    console.log(nodeId)
    dispatch(projectDataOperations.updateNodeName(nodeId,label))
    dispatch(projectDataOperations.modalToggleShow())
    dispatch(projectDataOperations.modalDataClear())
  },
  createNode:(nodeId,label) => {
    console.log(nodeId)
    dispatch(projectDataOperations.createNode(nodeId,label))
    dispatch(projectDataOperations.modalToggleShow())
    dispatch(projectDataOperations.modalDataClear())
    dispatch(projectDataOperations.addExpandedNode(nodeId))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(TreeModal)
