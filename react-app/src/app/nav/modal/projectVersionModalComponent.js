import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {sortBy} from 'lodash';

const ProjectVersionModal = ({project,project_versions,show,handleClose,onChangeVersion}) => {

  const versions = (project_versions) => {
    project_versions = sortBy(project_versions,[function(o) { return o.number; }]).reverse()

    return project_versions.map((version,index) => {
      return (
        <ListGroup.Item as='a' eventKey={index} key={version.version_number} action onClick={(event) => changeVersion(version.version_number,project._id)}>
          Version number: <strong>{version.version_number}</strong><br/>
          Version Id: <strong>{version._id}<br/></strong>
          Version date: <strong>{new Date(version.version_date).toLocaleDateString()}</strong>
        </ListGroup.Item>)
    })
  }

  const changeVersion = (version_number,projectId) => {
    // console.log(version_number,projectId);
    onChangeVersion(version_number,projectId)
  }

  return (
    <Modal show={show} onHide={handleClose}  size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{project.name} ({project._id})</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <ListGroup>
        {versions(project_versions)}
      </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProjectVersionModal;
