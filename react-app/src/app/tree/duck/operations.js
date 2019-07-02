import axios from 'axios';
import actions from './actions'
import config from '../../../config'
import treeManager from '../treeFunctions/treeManager'
import fileDownload from 'react-file-download';
// const apiUrl = 'http://localhost:3000/project';

const toggleSelectedNode = (key) => (dispatch) => {
  dispatch(actions.toggleSelectedNode(key))
}

const modalToggleShow = () => (dispatch) => {
  dispatch(actions.modalToggleShow())
}

const modalCloseShow = () => (dispatch) => {
  dispatch(actions.modalCloseShow())
}


const modalDataUpdate = (typeModal) => (dispatch) => {
  dispatch(actions.modalDataUpdate(typeModal))
}

const modalDataClear = () => (dispatch) => {
  dispatch(actions.modalDataClear())
}

const contextShow = () => (dispatch) => {
  dispatch(actions.contextShow())
}

const contextHide = () => (dispatch) => {
  dispatch(actions.contextHide())
}

const addSelectedNode = (key) => (dispatch) =>{
    dispatch(actions.addSelectedNode(key))
}

const resetSelectedNode = () => (dispatch) =>{
    dispatch(actions.resetSelectedNode())
}

const resetAndAddSelectedNode = (key) => (dispatch) =>{
    dispatch(actions.resetSelectedNode())
    dispatch(actions.addSelectedNode(key))
}

const removeSelectedNode = (key) => (dispatch) =>{
    dispatch(actions.removeSelectedNode(key))
}

const addExpandedNode = (key,tree) => (dispatch) =>{
  dispatch(actions.addExpandedNode(key,tree))
}

const updateExpandedNode = (expandedKeys,tree) => (dispatch) =>{
  dispatch(actions.updateExpandedNode(expandedKeys,tree))
}

const resetExpandedNode = () => (dispatch) =>{
  dispatch(actions.resetExpandedNode())
}

const removeExpandedNode = (key) => (dispatch) =>{
  dispatch(actions.removeExpandedNode(key))
}

const addClipboardNode = (keys) => (dispatch) =>{
  dispatch(actions.addClipboardNode(keys))
}
const setClipboardNode = (keys) => (dispatch) =>{
  dispatch(actions.resetClipboardNode(keys))
  dispatch(actions.addClipboardNode(keys))
}
const removeClipboardNode = (key) => (dispatch) =>{
  dispatch(actions.removeClipboardNode(key))
}

const resetClipboardNode = () => (dispatch) =>{
  dispatch(actions.resetClipboardNode())
}

const setClipboardMode = (mode) => (dispatch) => {
  dispatch(actions.setClipboardMode(mode));
}

const initAndFetchLastVersionProject = (project) => (dispatch) => {
  dispatch(actions.init());
  dispatch(FetchLastVersionProject(project));
}

const initAndFetchVersionProject = (project,version) => (dispatch) => {
  dispatch(actions.init());
  dispatch(FetchVersionProject(project,version));
}

const FetchLastVersionProject = (project) => (dispatch) => {
  var url = config.API_URL+"/project?project="+project;

  dispatch(actions.fetchProjectData())
  axios.get(url)
  .then((response) => {
    dispatch(actions.fetchProjectDataSuccess(treeManager.buildTreeData(response.data)))
  })
  .catch(error => {
    dispatch(actions.fetchProjectDataError(error));
    throw(error)
  });
};


const FetchVersionProject = (project,version) => (dispatch) => {
  var url = config.API_URL+"/project?project="+project+"&version="+version;
  dispatch(actions.fetchProjectData())
  axios.get(url)
  .then((response) => {
    dispatch(actions.fetchProjectDataSuccess(treeManager.buildTreeData(response.data)))
  })
  .catch(error => {
    dispatch(actions.fetchProjectDataError(error));
    throw(error)
  });
};

// const FetchLastVersionProject2 = (project) => (dispatch) => {
//   var url = config.API_URL+"/i2b2Ontologies/findById?project="+project;
//   dispatch(actions.init());
//   dispatch(actions.fetchProjectData());
//   axios.get(url)
//   .then((response) => {
//     dispatch(actions.fetchProjectDataSuccess(buildTreeData(response.data.tree[0].tree)))
//   })
//   .catch(error => {
//     dispatch(actions.fetchProjectDataError(error));
//     throw(error)
//   });
// };






const dndDropNodes = (info,selectedKeys,treeId) => (dispatch) => {
  const dropKey = info.node.props.eventKey;
  // dispatch(actions.addSelectedNode(info.dragNode.props.eventKey))
  if(!selectedKeys.includes(info.dragNode.props.eventKey)){
    selectedKeys = [info.dragNode.props.eventKey] ;
  }
  // selectedKeys = Array.from(new Set([...selectedKeys,info.dragNode.props.eventKey]));
  // dispatch(actions.dndDropNodes(dropKey));
  dispatch(moveNodes(selectedKeys,dropKey));
  dispatch(addExpandedNode(dropKey,treeId));
}

const createChildrens = (childrens,father,data,widthData) => (dispatch) => {
  childrens.forEach((child) => {
    dispatch(actions.createNode(father,data[child],widthData))
  })
}

const addChildrens = (childrens,father) => (dispatch) => {
  dispatch(actions.addChildrens(childrens,father,false))
}

const deleteChildrens = (childrens) => (dispatch) => {
  dispatch(actions.deleteChildrens(childrens))
}

const moveNodes = (sourceKeys,target) => (dispatch) => {
  dispatch(deleteChildrens(sourceKeys));
  dispatch(addChildrens(sourceKeys,target));
}

// const moveNodes = (sourcekeys,targetkey) => (dispatch) => {
//   dispatch(actions.addSelectedNode(info.dragNode.props.eventKey))
//   dispatch(actions.dndDropNodes(dropKey));
// }
// const showContextMenu = (info) => (dispatch) => {
//   dispatch(resetAndAddSelectedNode(info.node.props.eventKey));
//   dispatch(actions.contextSetPosition({
//     top:info.event.pageY,
//     bottom:info.event.pageY,
//     right:info.event.pageX,
//     left:0,
//   }))
//   dispatch(contextShow());
// }

const updateNodeName = (nodeId,label) => (dispatch) => {
    dispatch(actions.updateNodeName(nodeId,label))
}

const createNode = (nodeId,node) => (dispatch) => {
    dispatch(actions.createNode(nodeId,node))
}

const deleteNodes = (keys) => (dispatch) => {
  // console.log('test',keys);
  dispatch(moveNodes(keys,'a-1'))
}

const saveProject = (treeData,rootNode,projectId) => (dispatch) => {
  dispatch(actions.saveProjectStart());
  let body = {};
  body.projectId = projectId;
  body.treeData = treeManager.buildTreeObjectFromTreeData(treeData,rootNode,true);
  axios.post(config.API_URL+"/save",body)
    .then((response) => {
      dispatch(actions.saveProjectSuccess(response.data.project,response.data.returned_version));
      dispatch(FetchLastVersionProject(projectId));
    })
    .catch((error) => {
      console.log(error);
      dispatch(actions.saveProjectError(error))
    })
}

const fetchVersions = (projectId) => (dispatch) => {
    dispatch(actions.fetchVersionStart());

    axios.get(config.API_URL+"/project/versions?project_id="+projectId)
      .then((response) => {
        dispatch(actions.fetchVersionSuccess(response.data));
      })
      .catch((error) => {
        dispatch(actions.fetchVersionError(error));
      })
}

const buildCsv = (projectId,version) => (dispatch) => {
  let url = config.API_URL+"/build?projectId="+projectId+"&version="+version;
  axios.get(url)
    .then((response) => {
      fileDownload(response.data,'built-mapping.csv')
    })
}
export default{
  FetchLastVersionProject,
  toggleSelectedNode,
  addSelectedNode,
  removeSelectedNode,
  resetSelectedNode,
  resetAndAddSelectedNode,
  addExpandedNode,
  removeExpandedNode,
  resetExpandedNode,
  updateExpandedNode,
  dndDropNodes,
  modalToggleShow,
  contextShow,
  contextHide,
  // showContextMenu,
  modalDataUpdate,
  modalDataClear,
  updateNodeName,
  createNode,
  addClipboardNode,
  resetClipboardNode,
  removeClipboardNode,
  setClipboardNode,
  setClipboardMode,
  moveNodes,
  addChildrens,
  deleteChildrens,
  createChildrens,
  deleteNodes,
  modalCloseShow,
  saveProject,
  fetchVersions,
  FetchVersionProject,
  buildCsv,
  initAndFetchVersionProject,
  initAndFetchLastVersionProject
  // FetchLastVersionProject2
}
