import React, { Component } from 'react';
import Tree from '../tree/TreeContainer'
import Projects from '../projects/ProjectsContainer'
import NavBar from '../nav/NavBarContainer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SideBar from '../nav/sideBarContainer'
import { BrowserRouter as Router,Redirect, Route, Switch } from "react-router-dom";

class Home extends Component {
    render() {
        // const { characters } = this.state;

        return (
          <Router>
            <div>
              <NavBar />
              <Container fluid >
                <Row className="min-vh-100">
                  <Col className="nav flex-column bg-dark text-light sidenav pb-5 pl-2 pt-2 pb-2"  id="side" >
                    <SideBar/>
                  </Col>
                  <Col sm={10} id="tree">
                    <Switch>
                      <Route exact path='/tree' render={ () => <Tree treeId="Main" contextMenuId="Main" draggable={true} selectable={true} rootNode={['0-0']} rootIsExpanded/>} />
                      <Route exact path='/projects' render={ () => <Projects/>} />
                    </Switch>
                  </Col>
                </Row>
              </Container>
            </div>
            <Redirect from="/" to="projects" />
          </Router>
        );
    }
}

export default Home;
