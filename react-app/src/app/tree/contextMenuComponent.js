import React from 'react';
import { ContextMenu,MenuItem} from "react-contextmenu";
import hierarchicalFunction from '../utilities/hierarchicalFunction';

const MyContextMenu = ({show, position , showEditModal,addToClipBoard,selectedKeys,clipboard,clipboardMode,pasteNodes,deleteNodes,data,contextMenuId}) => {

  const handleClipBoard = (info,data) => {
    addToClipBoard(info,data,selectedKeys)
  }

  const handlePaste = () => {
    pasteNodes(selectedKeys,clipboard,clipboardMode,data)
  }

  const pasteOnChild = () => {
    let transitive = hierarchicalFunction.getTransitive([],selectedKeys[0],data,false);
    return clipboard.some(c => transitive.includes(c))||clipboard.includes(selectedKeys[0]);
  }
  const hasIdentifier = () => {
    let transitive=[...selectedKeys];
    selectedKeys.forEach((item) => {
      transitive = hierarchicalFunction.getTransitive(transitive,item,data,true);
    })
    // console.log(transitive.some(c => data[c].varIdentifier != null));
    return transitive.some(c => data[c].data.externalKey != null);
  }

  const handleDelete = () => {
    let transitive=[...selectedKeys];
    // selectedKeys.map((item) => {
    //   transitive = hierarchicalFunction.getTransitive(transitive,item,data,true);
    // })
    deleteNodes([...transitive]);
  }

  const hasChildren = () => {
    let key = selectedKeys[0];
    // console.log('selectedKeys',keys);
    if (key){
      // console.log(data[key].children);
      return (data[key].children.length>0)
    }else {
      return false;
    }
  }

  return (
  <ContextMenu id={contextMenuId} hideOnLeave={true}>
     <MenuItem
       action
       data={{item:"CREATE"}}
       onClick={showEditModal}
       disabled={selectedKeys.length!==1}
       >
       Create node
     </MenuItem>
     <MenuItem
       action
       data={{item:"RENAME"}}
       onClick={showEditModal}
       disabled={selectedKeys.length!==1}
       >
       Rename node
     </MenuItem>
     <MenuItem
       action
       data={{item:"MOVE"}}
       onClick={handleClipBoard}
       disabled={!selectedKeys.length>0}
       >
       Move nodes
     </MenuItem>
     <MenuItem
       action
       data={{item:"COPY"}}
       onClick={handleClipBoard}
       disabled={!selectedKeys.length>0}
       >
       Copy nodes
     </MenuItem>
     <MenuItem
       action
       data={{item:"COPY PATTERN"}}
       onClick={handleClipBoard}
       disabled={!selectedKeys.length>0}
       >
       Copy label pattern
     </MenuItem>
     <MenuItem
       action
       data={{item:"PASTE"}}
       onClick={handlePaste}
       disabled={selectedKeys.length!==1 || clipboard.length===0 || pasteOnChild()}
       >
       Paste nodes {clipboardMode}
     </MenuItem>
     <MenuItem
       action eventKey="DELETE"
       disabled={!selectedKeys.length>0 || hasIdentifier()}
       onClick={handleDelete}
       >
       Delete nodes
     </MenuItem>
     <MenuItem
       data={{item:"INFO"}}
       onClick={showEditModal}
       >
       Detail
     </MenuItem>
     <MenuItem
       data={{item:"REORDER"}}
       onClick={showEditModal}
       disabled={(selectedKeys.length!==1 || !hasChildren())}
       >
       Re-order childrens
     </MenuItem>
</ContextMenu>
)
}

export default MyContextMenu;
