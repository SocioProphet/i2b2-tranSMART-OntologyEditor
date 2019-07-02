import { connect } from 'react-redux'
import TreeNodes from './TreeComponent'
import {projectDataOperations} from './duck'

const mapStateToProps = (state) => ({
  dataDesc: state.tree.treeData.data,
  selectedKeys: state.tree.treeData.selectedKeys,
  loaded: state.tree.treeData.loaded,
  status: state.tree.treeData.status,
  update:state.tree.treeData.update
})

const mapDispatchToProps = (dispatch) => ({
   onSelect:(selectedKeys,info) => {
     // console.log(ownProps);
     dispatch(projectDataOperations.contextHide())
     if(info.nativeEvent.ctrlKey){
       // console.log(ownProps);
       dispatch(projectDataOperations.toggleSelectedNode(info.node.props.eventKey))
    }else{
       dispatch(projectDataOperations.resetAndAddSelectedNode(info.node.props.eventKey));
       // dispatch(projectDataOperations.addSelectedNode(info.node.props.eventKey));
     }
   },
   onExpand:(expandedKeys,expanded,treeId) => {
     // if(expanded.expanded){
     //   dispatch(projectDataOperations.addExpandedNode(expanded.node.props.eventKey));
     // }else{
     //   dispatch(projectDataOperations.removeExpandedNode(expanded.node.props.eventKey));
     // }
     dispatch(projectDataOperations.updateExpandedNode(expandedKeys,treeId));
   },
   onDrop: (info,selectedKeys,treeId) => {
     console.log(info);
     if (!info.dropToGap) {
       dispatch(projectDataOperations.dndDropNodes(info,selectedKeys,treeId));
     }else{
       console.warn("Drop on the drag set !!!")
    }
  },
  onRightClick: (info,selectedKeys) => {
    let key = info.node.props.eventKey;
    if(!selectedKeys.includes(key)){
      dispatch(projectDataOperations.resetAndAddSelectedNode(key))
    }
  },
  onKeyPress: (info,selectedKeys) => {
    // console.log('selectedKeys',selectedKeys);
    // if (selectedKeys.length > 0){
    //   console.log(info);
    // }
  }

})

export default connect(mapStateToProps,mapDispatchToProps)(TreeNodes)
