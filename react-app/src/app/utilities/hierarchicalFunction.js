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

export default {
  getTransitive,
}
