import React from 'react';
import Tree from 'rc-tree';
import {TreeNode} from 'rc-tree';
import {Spinner} from 'react-bootstrap'
import TreeModal from './modals/modalContainer'
import ContextMenu from './contextMenuContainer'
import './alt-css/tree.css';
import { ContextMenuTrigger } from "react-contextmenu";
import {sortBy} from 'lodash';




const getKeyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
      <path d="M5.5 0c-1.38 0-2.5 1.12-2.5 2.5 0 .16 0 .32.03.47l-3.03 3.03v2h3v-2h2v-1l.03-.03c.15.03.31.03.47.03 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5zm.5 1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
    </svg>
  );
}

const nodeList = [];
const loop = ((data,keysTot,loaded) => {
  if (loaded.length===0){
    loaded=[...keysTot]
  }
    let keys = (keysTot)? keysTot.filter(k => { return (data[k] ? loaded.includes(data[k].parent) ||  loaded.includes(k) : false )}) : [];
     if (keys && keys.length>0){
       let keysSort = [];
       keys.forEach((k) => {
         let sort = {};
         sort.label = data[k].label;
         sort.key = k;
         keysSort.push(sort);
       });

       // keysSort.sort(compareTarget);
       // console.log('keySort1',keysSort);
       keysSort = sortBy(keysSort,[function(o) { return o.label; }])
       // console.log('keySort2',keysSort);
       return keysSort.map((keySort) => {
          let key = keySort.key
          nodeList.push(keySort.key);
         // console.log('data',data[key]);
         let icon;
         if(data[key].data.externalKey && data[key].data.externalKey != null){
            icon=getKeyIcon();
         }
         if (data[key].children && data[key].children.length) {
           return <TreeNode key={key} icon={icon} title={data[key].label} isLeaf={false}>{loop(data,data[key].children,loaded)}</TreeNode>;
         }
         return <TreeNode key={key} icon={icon} title={data[key].label}  />;
       });
     }
   });


const MyTreeNodes = ({status, dataDesc, selectedKeys,loaded, onSelect,onExpand,onDrop,onRightClick,onKeyPress,draggable,selectable,contextMenuId,rootNode,treeId,rootIsExpanded }) => {
  // useEffect(() => {
  //   console.log('mount');
  //   document.addEventListener("onKeyDown",handleKeyPress);
  //
  // });


  // const test = () => {
  //   onKeyPress(info,selectedKeys)
  // }
  if (!loaded[treeId] || !rootNode.every((r) => loaded[treeId].includes(r))){
    if (rootIsExpanded){
      loaded[treeId] = rootNode;
    }else{
      loaded[treeId] = [];
    }
  }
  // console.log('loaded',loaded);*
  const handleDrop = (info) => {
    onDrop(info,selectedKeys,treeId);
  }
  const handleDragEnter = (info) =>{
    onExpand(info.expandedKeys);
  }

  const handleRightClick = (info) => {
    if(contextMenuId){
      onRightClick(info,selectedKeys);
    }
  }

  const handleOnExpand = (expandedKeys,expanded) => {
    onExpand(expandedKeys,expanded,treeId);
  }



  if (status === "loading"){
    return (
      <Spinner animation="grow" role="status" variant = "danger">
        <span className="sr-only">test</span>
      </Spinner>
    )
  }else{

    let tree = (
      <Tree
        className="treeContainer" showLine multiple
        draggable={draggable||false}
        selectable={selectable||false}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        expandedKeys={loaded[treeId]}
        onExpand={handleOnExpand}
        onDrop = {handleDrop}
        onDragEnter = {handleDragEnter}
        onRightClick = {handleRightClick}
      >
        {loop(dataDesc,rootNode,loaded[treeId])}
      </Tree>
    )
    if(contextMenuId){
      tree = (
        <div>
        <ContextMenuTrigger id={contextMenuId} holdToDisplay = {-1}>
          {tree}
        </ContextMenuTrigger>
        <TreeModal treeId={treeId}/>
        <ContextMenu contextMenuId={contextMenuId}/>
        </div>
      )
    }
    return (
      <div>
        {tree}
      </div>
    )
  }


}

export default MyTreeNodes;
