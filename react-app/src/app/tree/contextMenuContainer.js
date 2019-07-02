import { connect } from 'react-redux'
import ContextMenu from './contextMenuComponent'
import {projectDataOperations} from './duck'
import './alt-css/contextMenu.css';

const mapStateToProps = (state) => ({
  show:state.tree.treeData.contextMenuShow,
  position:state.tree.treeData.contextMenuPosition,
  selectedKeys:state.tree.treeData.selectedKeys,
  clipboard:state.tree.treeData.clipboard,
  clipboardMode:state.tree.treeData.clipboardMode,
  data: state.tree.treeData.data,
  update:state.tree.treeData.update
})

const mapDispatchToProps = (dispatch) => ({
  showEditModal:(event,data) => {
    // console.log(event.target);
    // console.log(data);
    let type = data.item;
    // dispatch(projectDataOperations.contextHide());
    dispatch(projectDataOperations.modalDataUpdate(type));
    dispatch(projectDataOperations.modalToggleShow());
  },
  addToClipBoard:(event,data,selectedKeys) => {
    let type = data.item;
    dispatch(projectDataOperations.setClipboardNode(selectedKeys));
    dispatch(projectDataOperations.setClipboardMode(type));
  },
  pasteNodes:(selectedKeys,clipboard,clipboardMode,data) => {
    if(clipboardMode === 'MOVE'){
      dispatch(projectDataOperations.moveNodes(clipboard,selectedKeys[0]))
    }
    if(clipboardMode === 'COPY'){
      dispatch(projectDataOperations.createChildrens(clipboard,selectedKeys[0],data,true))
    }
    if(clipboardMode === 'COPY PATTERN'){
      dispatch(projectDataOperations.createChildrens(clipboard,selectedKeys[0],data,false))
    }
  },
  deleteNodes: (keys) => {
      dispatch(projectDataOperations.deleteNodes(keys));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ContextMenu)
