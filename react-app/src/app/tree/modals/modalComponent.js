import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import RenameModal from './renameModalContainer'
import CreateModal from './createModalContainer'
import ReorderModal from './reorderModalContainer'
import Accordion from 'react-bootstrap/Accordion'

const TreeModal = ({show,data,handleClose,updateNodeName,createNode,type,treeId}) => {

const buildModalContainer = (type) =>{
  if(type === 'RENAME'){
    return(
      <div className="mt-1 pt-2 border-top">
      <RenameModal />
      </div>
    )
  }
  if(type === 'CREATE'){
    return(
      <div className="mt-1 pt-2 border-top">
        <CreateModal treeId={treeId}/>
      </div>)
  }
  if(type === 'REORDER'){
    return(
      <div className="mt-1 pt-2 border-top">
        <ReorderModal/>
      </div>)
  }
}

const defaultActiveKey = (type) => {
  if(type === 'INFO'){
    return "0"
  }else{
    return "-1"
  }
}
  const showData = (data) => {
    if(data){
      // console.log(data);
      return(
        Object.keys(data).map((k,index) => {
          return (
            <tr key={index}>
              <td>{k}</td>
              <td>{data[k] || ""}</td>
            </tr>
          )
        })
      )
    }
  }

    return (
    <Modal show={show} onHide={handleClose}  size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{data.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Accordion defaultActiveKey={defaultActiveKey(type)}>
          <Accordion.Toggle as={Button} variant="success" eventKey="0">
            Node informations
          </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
        <Table bordered striped className="mt-2"   size="sm">
          <tbody>
            {showData(data.data)}
          </tbody>
        </Table>
      </Accordion.Collapse>
        </Accordion>


        {buildModalContainer(type)}
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )

}



export default TreeModal;
