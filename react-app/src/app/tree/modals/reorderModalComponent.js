import React from 'react';
import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {sortBy} from 'lodash';

const previewArea=React.createRef();

const ReorderModal = ({show,node,data,updateNodeNames}) => {
  // console.log(node);
  const nbChildren = () => {
    return (node.children ? node.children.length : 0);
  }


  const availableProperties = (properties) => {
    return Array.from(properties).map((item,i) => {
      return (  <Dropdown.Item eventKey={item} key={i}>{item}</Dropdown.Item>)
    })
  }

  const order = (orderItem) => {
    let orderedItem = {};
    let orderedData = []
    let nbOrdered = 0;
    let nbNonOrdered = 0;
    // console.log(eventKey);
    node.children.forEach((c)=> {
      if(data[c].data[orderItem]){
        // console.log(data[c].label);
        nbOrdered ++;
        let child = {
          key : c,
          label : data[c].label,
          order : data[c].data[orderItem]
        };

        orderedData = [...orderedData,child]
        // console.log("child",child);
      }else {
        nbNonOrdered ++;
        // let child = {
        //   key : c,
        //   label : data[c].label,
        //   order : "-1"
        // };
        // orderedData = [...orderedData,child]
      }
    })
    orderedData = sortBy(orderedData,[function(o) { return o["order"]}])
    // console.log(orderedData);
    let nbCharMax = orderedData.length.toString().length;
    // console.log(nbCharMax);
    orderedData.map((item,index) => {
      // console.log("item",item);
      let j = item.order === "-1" ? 0 : index +1;
      let nbCharLoc = j.toString().length;
      let str = j.toString();
      for (var i = 0; i < nbCharMax - nbCharLoc; i++) {
        // console.log(i);
        str = "0" + str
        // console.log(str);
      }
      item.newLabel = str + " - " + item.label.replace(/[0-9]+ - /g,'');
      return item
    })
    orderedItem.nbNonOrdered = nbNonOrdered;
    orderedItem.nbOrdered = nbOrdered;
    orderedItem.orderedData=orderedData;
    return orderedItem;
  }

  const reorder = () => {
    if(previewArea.current.value.length > 0){
      console.log("clik");
      var rx = /# Re-ordered \(with property (.*)\) => (.*)\n/g
      var match = rx.exec(previewArea.current.value);
      let orederkey = match[1];
      let orderedData = order(orederkey);
      updateNodeNames(orderedData.orderedData);
    }
  }

  const changePreview = (eventKey) => {
    // let orderedData = [];
    let text = ""
    let data = order(eventKey);
    // let nbOrdered = 0;
    // let nbNonOrdered = 0;
    // console.log(eventKey);
    // node.children.forEach((c)=> {
    //   if(data[c].data[eventKey]){
    //     // console.log(data[c].label);
    //     nbOrdered ++;
    //     let child = {
    //       key : c,
    //       label : data[c].label,
    //       order : data[c].data[eventKey]
    //     };
    //
    //     orderedData = [...orderedData,child]
    //
    //   }else {
    //     nbNonOrdered ++;
    //     // let child = {
    //     //   key : c,
    //     //   label : data[c].label,
    //     //   order : "-1"
    //     // };
    //     // orderedData = [...orderedData,child]
    //   }
    // })
    // orderedData = sortBy(orderedData,[function(o) { return o["order"]}])
    // console.log(orderedData);
    // let nbCharMax = orderedData.length.toString().length;
    // // console.log(nbCharMax);
    // orderedData.map((item,index) => {
    //   let j = item.order === "-1" ? 0 : index +1;
    //   let nbCharLoc = j.toString().length;
    //   let str = j.toString();
    //   for (var i = 0; i < nbCharMax - nbCharLoc; i++) {
    //     // console.log(i);
    //     str = "0" + str
    //     // console.log(str);
    //   }
    //   item.newLabel = str + " - " + item.label.replace(/[0-9]+ - /g,'');
    //   return item
    // })
    console.log(data);
    data.orderedData.forEach((item) => {
      text = text + "\n" + item.newLabel;
    })

    text = "# Re-ordered (with property "+eventKey+") => " +data.nbOrdered + "\n# Non Re-ordered (without property ) => " +data.nbNonOrdered + "\n" + text;
    previewArea.current.value = text;
  }

  const dropdown = () => {
    let properties = new Set();
    if(data && node.children){
      node.children.forEach((c)=> {
        Object.keys(data[c].data).forEach(k => {
          properties.add(k);
        })
      })
    }
    if(properties.size>0){
      // console.log(properties);
      let dropdown = (
        <Dropdown onSelect={(eventKey,event) => {changePreview(eventKey)}}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            Property
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {availableProperties(properties)}
          </Dropdown.Menu>
        </Dropdown>
      )

      return dropdown;

    }

  }

  return (
      <div  >
        Number of children : {nbChildren()}
        {dropdown()}
        <Form.Label>Preview</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          disabled
          rows="8"
          ref = {previewArea}
          value=""
        />

        <Button className="ml-3 mt-3" variant="primary" onClick={(event) => {reorder()}}>
          Re-Order
        </Button>

      </div>
  )
}



export default ReorderModal;
