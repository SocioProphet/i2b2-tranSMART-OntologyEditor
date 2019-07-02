import React , {useEffect}from 'react';
import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

const renameInput=React.createRef();



const RenameModal = ({show,data,handleClose,updateNodeName,createNode,setFocus}) => {
  const rename = () => {
    let label=renameInput.current.value;
    updateNodeName(data.key,label)
  }

  const handleKeyDown = (event) => {
    if (event.which === 13) {
      rename();
    }
  }

  useEffect(() => {
    renameInput.current.focus();
  });

  return (
      <div  >
        <Form.Label>Rename</Form.Label>
        <Form.Control
          type="text"
          defaultValue={data.label}
          ref = {renameInput}
          onKeyPress={handleKeyDown}
          />
        <Button className="mt-3" variant="primary" onClick={rename} >
          Rename node
        </Button>
      </div>
  )
}



export default RenameModal;
