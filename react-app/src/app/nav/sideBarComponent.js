import React from 'react';
import KeyList from '../utilities/keyList'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import {FaSave, FaFileCsv,FaListUl} from 'react-icons/fa';
import Col from 'react-bootstrap/Col'
import ProjectVersionModal from './modal/projectVersionModalContainer'

const SideBar = ({listClipBoard,data,mode,onSuppressClipboard,onSave,project,returned_version,onShowProjectDetail,buildCsv}) => {

  const listDeleted = () => {
    let listDeleted = data['a-1']?data['a-1'].children:[];
    // console.log('listDeleted',listDeleted);
    return [...listDeleted]
  }

  const handleSave = (event) => {
    onSave(project._id,data);
  }

  const showDetails = (event) => {
    onShowProjectDetail(project._id)
  }

  const projectInfo = (project,returned_version) => {

    if(project && Object.keys(project).length > 0) {
      return (
        <div className="container-fluid p-1">

          <ListGroup>
            <ListGroup.Item variant="light">
              <Row>
                <Col md="auto">
                  Project: {project.name}
                </Col>
                <Col className="text-right">
                  <FaListUl onClick={showDetails}/>
                </Col>
                <ProjectVersionModal/>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
                  Version: {returned_version}
            </ListGroup.Item>
            <ListGroup.Item variant="light">Creation date: {new Date(project.creation_date).toLocaleDateString()}</ListGroup.Item>
            <ListGroup.Item variant="light">Version date: {new Date(project.version_date).toLocaleDateString()}</ListGroup.Item>
          </ListGroup>

            <Button
              className="m-1"
              onClick={handleSave} >
              <FaSave/> Save
            </Button>
            <Button className="m-1" variant="success" onClick={(event) => buildCsv(project._id,returned_version)}><FaFileCsv/> Build csv </Button>
        </div>
      );
    }
  }

  return (
    <div className="cardBox">
      <Row className="m-1 mb-4 bg-light" >
        {projectInfo(project,returned_version)}
      </Row>
      <div >
      <KeyList className="mt-2" head={"clipboard"} mode={mode} list={listClipBoard} suppressClick={onSuppressClipboard} variant="dark"/>
      <KeyList className="mt-2" head={"Deleted nodes"} list={listDeleted()} variant="dark"/>
      </div>
    </div>
  )
}

export default SideBar
