const INIT = 'tree/INIT';

const FETCH_PROJECT_DATA = 'tree/FETCH_PROJECT_DATA';
const FETCH_PROJECT_DATA_SUCCESS = 'tree/FETCH_PROJECT_DATA_SUCCESS';
const FETCH_PROJECT_DATA_ERROR = 'tree/FETCH_PROJECT_DATA_ERROR';
const PARSE_PROJECT_DATA = 'tree/PARSE_PROJECT_DATA';

const TOGGLE_SELECTED_NODE ='tree/TOGGLE_SELECTED_NODE';
const ADD_SELECTED_NODE ='tree/ADD_SELECTED_NODE';
const REMOVE_SELECTED_NODE ='tree/REMOVE_SELECTED_NODE';
const RESET_SELECTED_NODE ='tree/RESET_SELECTED_NODE';

const ADD_CLIPBOARD_NODE ='tree/ADD_CLIPBOARD_NODE';
const REMOVE_CLIPBOARD_NODE ='tree/REMOVE_CLIPBOARD_NODE';
const RESET_CLIPBOARD_NODE ='tree/RESET_CLIPBOARD_NODE';
const SET_CLIPBOARD_MODE ='tree/SET_CLIPBOARD_MODE';


const UPDATE_EXPANDED_NODE ='tree/UPDATE_EXPANDED_NODE';
const ADD_EXPANDED_NODE ='tree/ADD_EXPANDED_NODE';
const REMOVE_EXPANDED_NODE ='tree/REMOVE_EXPANDED_NODE';
const RESET_EXPANDED_NODE ='tree/RESET_EXPANDED_NODE';

const DND_DROP_NODES = 'tree/dnd/DND_DROP_NODES'

const DELETE_CHILDRENS = 'tree/DELETE_CHILDRENS'
const ADD_CHILDRENS = 'tree/ADD_CHILDRENS'
const DELETE_NODES = 'tree/DELETE_NODES'

const MODAL_TOGGLE_SHOW ='tree/modal/MODAL_TOGGLE_SHOW';
const MODAL_CLOSE_SHOW ='tree/modal/MODAL_CLOSE_SHOW';
const MODAL_DATA_UDPATE ='tree/modal/MODAL_DATA_UDPATE';
const MODAL_DATA_CLEAR ='tree/modal/MODAL_DATA_CLEAR';

const CONTEXT_SET_POSITION ='tree/context/CONTEXT_SET_POSITION';
const CONTEXT_SHOW ='tree/context/CONTEXT_SHOW';
const CONTEXT_HIDE ='tree/context/CONTEXT_HIDE';

const UPDATE_NODE_NAME ='tree/UPDATE_NODE_NAME';
const CREATE_NODE ='tree/CREATE_NODE';

const SAVE_PROJECT_START = 'project/SAVE_PROJECT_START';
const SAVE_PROJECT_SUCCESS = 'project/SAVE_PROJECT_SUCCESS';
const SAVE_PROJECT_ERROR = 'project/SAVE_PROJECT_ERROR';

const FETCH_VERSIONS_START = 'project/FETCH_VERSIONS_START';
const FETCH_VERSIONS_SUCCESS = 'project/FETCH_VERSIONS_SUCCESS';
const FETCH_VERSIONS_ERROR = 'project/FETCH_VERSIONS_ERROR';
export default {
  INIT,
  FETCH_PROJECT_DATA,
  FETCH_PROJECT_DATA_SUCCESS,
  FETCH_PROJECT_DATA_ERROR,
  PARSE_PROJECT_DATA,
  TOGGLE_SELECTED_NODE,
  ADD_SELECTED_NODE,
  REMOVE_SELECTED_NODE,
  RESET_SELECTED_NODE,
  ADD_EXPANDED_NODE,
  REMOVE_EXPANDED_NODE,
  RESET_EXPANDED_NODE,
  UPDATE_EXPANDED_NODE,
  DND_DROP_NODES,
  MODAL_TOGGLE_SHOW,
  MODAL_CLOSE_SHOW,
  CONTEXT_SHOW,
  CONTEXT_HIDE,
  CONTEXT_SET_POSITION,
  MODAL_DATA_UDPATE,
  MODAL_DATA_CLEAR,
  UPDATE_NODE_NAME,
  CREATE_NODE,
  ADD_CLIPBOARD_NODE,
  RESET_CLIPBOARD_NODE,
  REMOVE_CLIPBOARD_NODE,
  SET_CLIPBOARD_MODE,
  DELETE_CHILDRENS,
  ADD_CHILDRENS,
  DELETE_NODES,
  SAVE_PROJECT_START,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_ERROR,
  FETCH_VERSIONS_START,
  FETCH_VERSIONS_SUCCESS,
  FETCH_VERSIONS_ERROR
}
