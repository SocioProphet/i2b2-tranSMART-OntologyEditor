import { combineReducers } from 'redux'
import types from './types';

const  intitialState = {
  data: {},
  project:{},
  project_versions:[],
  selectedKeys : [],
  loaded:{},
  editModalShow:false,
  contextMenuShow:false,
  contextMenuPosition:{
    top: 0,
    left: 1000,
    bottom: 100,
    right: 10,
  },
  editModalData:{},
  update:false,
  nodeKeyMax:1,
  typeModal:"",
  clipboardMode:"",
  clipboard:[],
  pattern:[],
}

const getTransitive = (arr,key,data,desc) => {
  if (desc){
    if(data[key].children){
      data[key].children.forEach(k => {
        arr.push(k);
        getTransitive(arr,k,data,desc);
      });
    }
  }else{
    if(data[key].parent){
      let k = data[key].parent
      arr.push(k);
      getTransitive(arr,k,data,desc);
    }
  }

  return arr;
}

const toggleSelectedNode = (key,selectedKeys,data) => {
    let childrens = [];
    childrens = getTransitive(childrens,key,data,true);
    // console.log('childrens',childrens);
    let parents = [];
    parents = getTransitive(parents,key,data,false);
    // console.log('parents',parents);
    if (!selectedKeys.includes(key)){
      selectedKeys = selectedKeys.filter(s => !childrens.includes(s))
      selectedKeys = selectedKeys.filter(s => !parents.includes(s))

      return [...selectedKeys,key]
    }else{
      return selectedKeys.filter(s => s !== key);
    }
}

const dropNodes = (dropKey,dragKeys,data) => {
  // eslint-disable-next-line
  dragKeys.map((dragKey) => {
    data[data[dragKey].parent].children.forEach((child,index,arr) => {
      if(child === dragKey){
        arr.splice(index,1);
      }
    });
    data[dragKey].parent = dropKey;
  })
  data[dropKey].children = [...data[dropKey].children||[],...dragKeys];

  return data;
};

const deleteChildrens = (sourceKeys,data) => {
  // console.log(sourceKeys);

  sourceKeys.forEach((sourceKey) => {
    // console.log('sourceKey',sourceKey);
    // console.log(data[data[sourceKey].parent].children);
    data[data[sourceKey].parent].children.forEach((child,index,arr) => {
      if(child === sourceKey){
        arr.splice(index,1);
      }
    });
    // data[sourceKey].parent = "0-0";
    // data["0-0"].children.push(sourceKey);
  })

  return data;
}

const addChildrens = (sourceKeys,target,data) => {
  sourceKeys.forEach((sourceKey) => {
    data[sourceKey].parent = target;
  })
  data[target].children = [...data[target].children||[],...sourceKeys];
  return data;
}



const updateNodeName = (data,nodeId,label) => {
  // console.log('reducer',nodeId);
  // console.log('reducer',label);
  data[nodeId].label=label;
  return data;
}

let i = 0;
const createNode = (data,nodeId,node,withData,nodeKeyMax,j) => {
  if(j===0){
    i=j;
  }
  // console.log('node',node);
  // console.log('nodeId',nodeId);
  i++;
  let key = 'add-'+nodeKeyMax+'-'+i;
  // console.log('key',key);
  // console.log('data[key]',data[key]);
  data[key] = {};
  data[key].label = node.label||"";
  if (withData){
    // data[key].varName = node.varName||data[key].label;
    // data[key].varIdentifier = node.varIdentifier;
    data[key].data = node.data;
  }else{
    // data[key].varName = data[key].label;
    data[key].data = {};
    data[key].data.varName = data[key].label;
  }
  data[key].children = [];
  data[key].parent = nodeId;
  data[key].key = key;

  if(data[nodeId].children){
    data[nodeId].children.push(key);
  }else{
    data[nodeId].children=[key];
  }
  // console.log('data[key]2',data[key]);
  if(withData){
    if (node.children){
      node.children.forEach((child) => {
        createNode(data,key,data[child],withData,nodeKeyMax);
      })
    }
  }

  return data;
}

const treeData = ( state = intitialState, action) => {
  switch (action.type) {
  case types.INIT:
     return intitialState;
  case types.FETCH_PROJECT_DATA:
     return { ...state, status: action.status,data:{},project:{},selectedKeys:[]};
  case types.FETCH_PROJECT_DATA_SUCCESS:
     return { ...state, data: action.data.dataDesc,project:action.data.project,returned_version:action.data.returned_version, status: action.status};
  case types.TOGGLE_SELECTED_NODE:
     return { ...state, selectedKeys: toggleSelectedNode(action.key,[...state.selectedKeys],state.data)};
  case types.ADD_SELECTED_NODE:
      return { ...state, selectedKeys: Array.from(new Set([...state.selectedKeys,action.key]))};
  case types.RESET_SELECTED_NODE:
      return { ...state, selectedKeys: []};
  case types.REMOVE_SELECTED_NODE:
      return { ...state, selectedKeys: state.selectedKeys.splice(state.selectedKeys.indexOf(action.key), 1)};
  case types.ADD_EXPANDED_NODE:
      return { ...state, loaded: {...state.loaded,[action.tree]:Array.from(new Set([...state.loaded[action.tree],action.key]))}};
  case types.RESET_EXPANDED_NODE:
      return { ...state, loaded: {}};
  case types.REMOVE_EXPANDED_NODE:
      return { ...state, loaded: state.loaded.filter(f => !state.data[action.key].children.includes(f))};
  case types.UPDATE_EXPANDED_NODE:
      return { ...state, loaded: {...state.loaded,[action.tree]:action.expandedKeys}};
  case types.DND_DROP_NODES:
      return {...state,data: dropNodes(action.dropKey,state.selectedKeys,state.data),selectedKeys:[]}
  case types.MODAL_TOGGLE_SHOW:
      return {...state,editModalShow:!state.editModalShow}
  case types.MODAL_CLOSE_SHOW:
      return {...state,editModalShow:false}
  case types.CONTEXT_SHOW:
      return {...state,contextMenuShow:true}
  case types.CONTEXT_HIDE:
      return {...state,contextMenuShow:false}
  case types.CONTEXT_SET_POSITION:
      return {...state,contextMenuPosition:action.position}
  case types.MODAL_DATA_UDPATE:
      return {...state,editModalData:state.data[state.selectedKeys[0]]||{},typeModal:action.typeModal}
  case types.MODAL_DATA_CLEAR:
      return {...state,editModalData:{}}
  case types.UPDATE_NODE_NAME:
      return {...state,data: updateNodeName(state.data,action.nodeId,action.label),update:!state.update}
  case types.CREATE_NODE:
      return {...state,data: createNode(state.data,action.nodeId,action.node,action.widthData,state.nodeKeyMax,0),nodeKeyMax:state.nodeKeyMax+1,update:!state.update}
  case types.ADD_CLIPBOARD_NODE:
    return {...state,clipboard:[...state.clipboard,...action.keys]}
  case types.REMOVE_CLIPBOARD_NODE:
        return {...state,clipboard:state.clipboard.splice(state.clipboard.indexOf(action.key), 1)}
  case types.RESET_CLIPBOARD_NODE:
    return {...state,clipboard:[]}
  case types.SET_CLIPBOARD_MODE:
    return {...state,clipboardMode:action.mode}
  case types.ADD_CHILDRENS:
    return {...state,data:addChildrens(action.childrens,action.father,state.data),update:!state.update}
  case types.DELETE_CHILDRENS:
    return {...state,data:deleteChildrens(action.childrens,state.data),update:!state.update}
  case types.DELETE_NODES:
    return {...state,data:state.data.filter(f => !action.keys.includes(f.key)),update:!state.update}
  case types.SAVE_PROJECT_SUCCESS:
    return {...state,project:action.project,returned_version:action.returned_version,update:!state.update}
  case types.FETCH_VERSIONS_START:
    return {...state,project_versions:[]}
  case types.FETCH_VERSIONS_SUCCESS:
    return {...state,project_versions:action.project_versions}
  default:
    return state;
  }
}

const reducer = combineReducers( {
    treeData: treeData,

} );

export default reducer;
