import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import config from '../../../config'

const labelInput=React.createRef();
const descriptionInput=React.createRef();

const ProjectModal = ({show,data,handleClose,createProject,fileProcessed,fileId,fileRemoved}) => {

    const createClick = () => {
      let project_name=labelInput.current.value;
      let project_description=descriptionInput.current.value;
      if(fileId!=="" && labelInput.current.value!==null){
        createProject(project_name,project_description,fileId)
      }else{
        alert("Please set a name and import a file")
      }
    }

    return (
    <Modal show={show} onHide={handleClose}  size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Create a project</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form.Label>Project name</Form.Label>
        <Form.Control
          required
          type="text"
          ref = {labelInput}
        />
      <Form.Label>Project description</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          ref = {descriptionInput}
        />
      <FilePond className="ml-3 mt-3" name={"file"} server={config.API_URL+"/files"}
           onprocessfile={fileProcessed} removefile={fileRemoved}>
        </FilePond>
        <Button className="ml-3 mt-3" variant="primary" onClick={createClick}>
                Create project
        </Button>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )

}



export default ProjectModal;
