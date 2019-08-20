const parser = (data,isRoot,parentKey, callback) =>{
  data.forEach((item,index) => {
    index++;
    callback(item,isRoot,parentKey,index);
    if (item.children) {
      parser(item.children,false,parentKey+"-"+index, callback);
    }
  });
};

const buildTreeData = (data) =>{
    // console.log('data',data);
    let dataDesc = {};
    // dataDesc['root'] = ['0-0'];

    dataDesc['a-1'] = {};
    dataDesc['a-1'].label = 'Deleted';
    dataDesc['a-1'].data = {};
    dataDesc['a-1'].data.varName = 'Deleted';
    dataDesc['a-1'].key = 'a-1';
    dataDesc['a-1'].children = [];
    // let data = this.state.data;

    dataDesc['0-0'] = {};
    dataDesc['0-0'].label = 'ROOT';
    dataDesc['0-0'].data = {};
    dataDesc['0-0'].data.varName = 'ROOT';
    dataDesc['0-0'].key = '0-0';
    dataDesc['0-0'].deleted = 0;
    dataDesc['0-0'].children = [];
    parser(data.tree,true,1,(item,isRoot,parentKey,index) => {
      // console.log(item);
      let key = parentKey+"-"+index;
      dataDesc[key] = {};
      if(isRoot){
        dataDesc['0-0'].children.push(key);
        dataDesc[key].parent = '0-0';
      }else{
        dataDesc[key].parent = parentKey;
        dataDesc[parentKey].children.push(key);
      }
      dataDesc[key].label = item.text;
      dataDesc[key].deleted = item.deleted?item.deleted:0;
      dataDesc[key].data = item.data || {};
      // dataDesc[key].data = item.data.varName;
      // dataDesc[key].data.varIdentifier = item.data.varIdentifier;
      dataDesc[key].key = key;


      let childrens = [];
      if (item.children) {
        dataDesc[key].children = childrens;
      //   item.children.forEach((child) => {
      //     childrens.push(child.data.varName);
      //   });
      //   dataDesc[item.data.varName].children = childrens;
      }
    });
    // console.log('fetched',dataDesc);
    let dataDef = {};
    // dataDef.loaded = ['0-0'];
    dataDef.dataDesc = dataDesc;
    dataDef.project = data.project;
    dataDef.returned_version = data.returned_version
    // console.log('def',dataDef);
    return dataDef;
};

const parseToTreeObject = (treeData,nodes,pere) => {
  nodes.forEach( (node) => {
    let fils ={}
    fils.text = treeData[node].label;
    fils.data = treeData[node].data;

    if(treeData[node].children){
      fils.children=[];
      parseToTreeObject(treeData,treeData[node].children,fils.children)
    }
    if(pere){
      pere.push(fils);
    }
  })
}

const buildTreeObjectFromTreeData = (treeData,rootNode,exludeRootNode) => {
  let treeObject=[];
  if(treeData[rootNode]){
    if(exludeRootNode){
      parseToTreeObject(treeData,treeData[rootNode].children,treeObject);
    }else{
      parseToTreeObject(treeData,[rootNode],treeObject);
    }
  }
  return(treeObject);
}

export default {
  buildTreeData,
  parser,
  buildTreeObjectFromTreeData
}
