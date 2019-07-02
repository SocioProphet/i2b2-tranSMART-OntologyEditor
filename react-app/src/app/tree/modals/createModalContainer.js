import { connect } from 'react-redux'
import CreateModal from './createModalComponent'
import {projectDataOperations} from '../duck'


const mapStateToProps = (state) => ({
  show:state.tree.treeData.editModalShow,
  data:state.tree.treeData.editModalData,
})

const mapDispatchToProps = (dispatch) => ({
  createNode:(nodeId,label,treeId) => {
    // console.log(nodeId)
    let node ={};
    node.label=label;
    dispatch(projectDataOperations.createNode(nodeId,node))
    dispatch(projectDataOperations.modalCloseShow())
    dispatch(projectDataOperations.modalDataClear())
    dispatch(projectDataOperations.addExpandedNode(nodeId,treeId))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(CreateModal)
