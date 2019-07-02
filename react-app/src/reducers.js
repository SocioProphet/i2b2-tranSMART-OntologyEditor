import { combineReducers } from 'redux'
// import treeData from './app/home/duck/reducers'
import treeData from './app/tree/duck/'
import navBarData from './app/nav/duck/'


export default combineReducers({
    tree: treeData,
    navBarData: navBarData

});
