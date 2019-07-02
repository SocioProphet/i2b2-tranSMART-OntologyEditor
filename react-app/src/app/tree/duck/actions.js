import types from './types';

const init = () => ({
  type:types.INIT
})

const fetchProjectData = (data) => ({
  type: types.FETCH_PROJECT_DATA,
  status: 'loading',
})

const fetchProjectDataSuccess = (data) => ({
  type: types.FETCH_PROJECT_DATA_SUCCESS,
  status: 'success',
  data:data
})

const fetchProjectDataError = (message) => ({
  type: types.FETCH_PROJECT_DATA_ERROR,
  message:message,
  status:"error",
})

const toggleSelectedNode = (key) => {
  return {
    type: types.TOGGLE_SELECTED_NODE,
    key: key
  }
}

const addSelectedNode = (key) => {
  return {
    type: types.ADD_SELECTED_NODE,
    key: key
  }
}

const resetSelectedNode = () => {
  return {
    type: types.RESET_SELECTED_NODE
  }
}

const removeSelectedNode = (key) => {
  return {
    type: types.REMOVE_SELECTED_NODE,
    key: key
  }
}

const addExpandedNode = (key,tree) => {
  return {
    type: types.ADD_EXPANDED_NODE,
    key: key,
    tree:tree
  }
}

const modalCloseShow = () => {
  return {
    type: types.MODAL_CLOSE_SHOW,
  }
}

const updateExpandedNode = (expandedKeys,tree) => {
  return {
    type: types.UPDATE_EXPANDED_NODE,
    expandedKeys: expandedKeys,
    tree:tree
  }
}

const resetExpandedNode = () => {
  return {
    type: types.RESET_EXPANDED_NODE
  }
}

const removeExpandedNode = (key) => {
  return {
    type: types.REMOVE_EXPANDED_NODE,
    key: key
  }
}

const dndDropNodes = (dropKey) => {
  return {
    type:types.DND_DROP_NODES,
    dropKey:dropKey
  }
}

const deleteChildrens = (childrens) => {
  return {
    type: types.DELETE_CHILDRENS,
    childrens:childrens
  }
}

const addChildrens = (childrens,father,create) => {
  return {
    type: types.ADD_CHILDRENS,
    childrens:childrens,
    father:father,
    create:create
  }
}

const modalToggleShow = () => {
  return {
    type: types.MODAL_TOGGLE_SHOW,
  }
}

const modalDataUpdate = (typeModal) => {
  return {
    type: types.MODAL_DATA_UDPATE,
    typeModal:typeModal
  }
}

const modalDataClear = () => {
  return {
    type: types.MODAL_DATA_CLEAR
  }
}

const contextShow = () => {
  return {
    type: types.CONTEXT_SHOW,
  }
}
const contextHide = () => {
  return {
    type: types.CONTEXT_HIDE,
  }
}

const contextSetPosition = (position) => {
  return {
    type: types.CONTEXT_SET_POSITION,
    position: position
  }
}

const updateNodeName = (nodeId,label) => {
  return {
    type: types.UPDATE_NODE_NAME,
    nodeId: nodeId,
    label: label,
  }
}

const createNode = (nodeId,node,widthData) => {
  return {
    type: types.CREATE_NODE,
    nodeId: nodeId,
    node: node,
    widthData: widthData,
  }
}

const addClipboardNode = (keys) => {
  return {
    type: types.ADD_CLIPBOARD_NODE,
    keys:keys
  }
}

const setClipboardMode = (mode) => {
  return {
    type: types.SET_CLIPBOARD_MODE,
    mode:mode
  }
}


const resetClipboardNode = () => {
  return {
    type: types.RESET_CLIPBOARD_NODE
  }
}

const removeClipboardNode = (key) => {
  return {
    type: types.REMOVE_CLIPBOARD_NODE,
    key:key
  }
}

const deleteNodes = (keys) => {
  return {
    type:types.DELETE_NODES,
    keys:keys
  }
}

const saveProjectStart = () => {
  return {
    type: types.SAVE_PROJECT_START
  }
}

const saveProjectSuccess = (project,version) => {
  return {
    type: types.SAVE_PROJECT_SUCCESS,
    project:project,
    returned_version:version
  }
}

const saveProjectError = (err) => {
  return {
    type: types.SAVE_PROJECT_ERROR
  }
}

const fetchVersionStart = () => {
    return {
      type: types.FETCH_VERSIONS_START
    }
}

const fetchVersionSuccess = (project_versions) => {
    return {
      type: types.FETCH_VERSIONS_SUCCESS,
      project_versions:project_versions
    }
}

const fetchVersionError = (err) => {
    return {
      type: types.FETCH_VERSIONS_ERROR,
      msg: err
    }
}
export default {
  init,
  fetchProjectData,
  fetchProjectDataSuccess,
  fetchProjectDataError,
  toggleSelectedNode,
  addSelectedNode,
  resetSelectedNode,
  removeSelectedNode,
  addExpandedNode,
  resetExpandedNode,
  removeExpandedNode,
  updateExpandedNode,
  dndDropNodes,
  modalToggleShow,
  contextShow,
  contextHide,
  contextSetPosition,
  modalDataUpdate,
  modalDataClear,
  updateNodeName,
  createNode,
  addClipboardNode,
  resetClipboardNode,
  removeClipboardNode,
  setClipboardMode,
  deleteChildrens,
  addChildrens,
  deleteNodes,
  modalCloseShow,
  saveProjectStart,
  saveProjectSuccess,
  saveProjectError,
  fetchVersionStart,
  fetchVersionSuccess,
  fetchVersionError
}
