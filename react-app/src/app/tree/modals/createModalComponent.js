import React , {useEffect}from 'react';
import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const createInput=React.createRef();
const createArea=React.createRef();

const CreateModal = ({show,data,handleClose,updateNodeName,createNode,setFocus,treeId}) => {

  const CreateClick = () => {
    let label=createInput.current.value;
    createNode(data.key,label,treeId)
  }

  const CreateMultipleClick = () => {
    let labels=createArea.current.value.split('\n');
    labels.forEach((label) => {
      if (label !== ""){
        createNode(data.key,label,treeId)
      }
    })
    // handleClose();
  }

  const handleKeyDown = (event) => {
    if (event.which === 13) {
      CreateClick();
    }
  }

  useEffect(() => {
    createInput.current.focus();
  });

  return (
      <div  >
        <Form.Label>Target node</Form.Label>
        <Form.Control
            type="text"
            disabled
            defaultValue={data.label}

        />
      <Tabs className="mt-3" defaultActiveKey="single">
        <Tab eventKey="single" title="Single Node">
        <Form.Label>Node label</Form.Label>
        <Form.Control
          type="text"
          ref = {createInput}
          onKeyDown={handleKeyDown}
        />
        <Button className="ml-3 mt-3" variant="primary" onClick={CreateClick}>
              Create node
        </Button>
        </Tab>
        <Tab eventKey="multiple" title="Multiple Nodes">
        <Form.Label>Nodes label (one per line)</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          ref = {createArea}
        />
      <Button className="ml-3 mt-3" variant="primary" onClick={CreateMultipleClick}>
              Create nodes
        </Button>
        </Tab>
      </Tabs>
      </div>
  )
}



export default CreateModal;
