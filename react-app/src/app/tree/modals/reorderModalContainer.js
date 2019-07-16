import { connect } from 'react-redux'
import Reorder from './reorderModalComponent'
import {projectDataOperations} from '../duck'


const mapStateToProps = (state) => ({
  show:state.tree.treeData.editModalShow,
  data:state.tree.treeData.data,
  node:state.tree.treeData.editModalData,
})

const mapDispatchToProps = (dispatch) => ({
  updateNodeNames:(renameItems) => {
    renameItems.forEach(item =>{
      // console.log(item);
      dispatch(projectDataOperations.updateNodeName(item.key,item.newLabel))
    })
    dispatch(projectDataOperations.modalToggleShow())
    dispatch(projectDataOperations.modalDataClear())
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Reorder)
