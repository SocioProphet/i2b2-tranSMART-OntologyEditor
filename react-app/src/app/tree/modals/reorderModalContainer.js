import { connect } from 'react-redux'
import Reorder from './reorderModalComponent'
import {projectDataOperations} from '../duck'


const mapStateToProps = (state) => ({
  show:state.tree.treeData.editModalShow,
  data:state.tree.treeData.data,
  node:state.tree.treeData.editModalData,
})

const mapDispatchToProps = (dispatch) => ({
  updateNodeName:(nodeId,label) => {
    console.log(nodeId)
    dispatch(projectDataOperations.updateNodeName(nodeId,label))
    dispatch(projectDataOperations.modalToggleShow())
    dispatch(projectDataOperations.modalDataClear())
  },

})

export default connect(mapStateToProps,mapDispatchToProps)(Reorder)
