import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProjectModal from './modal/createProjectModalContainer'
// import { BrowserRouter as Router, Route, NavLink,Link, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";


const MyNavBar = ({projects, onSelect,showCreateProjectModal,isVisiblecreateModal}) => {


return (

  <Navbar variant="dark" bg="dark" expand="lg">
    <Navbar.Brand href="#home">I2b2-Ontology Editor</Navbar.Brand>
    <Nav className="mr-auto navbar-navscroll" defaultActiveKey="projects">
      <NavDropdown title="Select a project !">
            {projects
              .filter(item => item.status !== "deleted")
              .map((item,index) =>
                  <NavDropdown.Item key={index} eventKey={item._id} onSelect={onSelect}>{item.name}</NavDropdown.Item>
              )
            }
      </NavDropdown>
      <LinkContainer to="/projects">
        <Nav.Item >
          <Nav.Link as="div" eventKey="projects">
            Projects
          </Nav.Link>
        </Nav.Item>
      </LinkContainer>
      <LinkContainer to="/tree">
        <Nav.Item>
          <Nav.Link as="div" eventKey="tree">
            Current Tree
          </Nav.Link>
        </Nav.Item>
      </LinkContainer>
    </Nav>

    <Form inline>
      <Button variant="outline-light"
        onClick={showCreateProjectModal}
      >
        New Project
      </Button>

  </Form>
  <ProjectModal/>
  </Navbar>
)
}

export default MyNavBar
