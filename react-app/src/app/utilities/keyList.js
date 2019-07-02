import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Tree from '../tree/TreeContainer'
import {FaTrash} from 'react-icons/fa';

class KeyList extends Component {



  render() {
      // const { characters } = this.state;
      const buildList = (list) => {
        return (list.map((l,i) => {
            return (
              <ListGroup.Item key={i}>
                <Tree treeId={"tree"+i} draggable={false} selectable={false} rootNode={[l]}/>
              </ListGroup.Item>
          )
        }))
      }
      let list=this.props.list;
      let variant = this.props.variant||"dark";
      let bg = this.props.bg||"light";
      let mode = this.props.mode;
      let className = this.props.className ;
      // let suppressable = this.props.suppressable ;
      let suppressClick = this.props.suppressClick ;
      let label=this.props.head + " ("+list.length+") ";
      if (mode){
        label += "["+mode+"]"
      }
      let suppress;
      if(suppressClick){
        suppress = (
          <Col className="text-right">
            <FaTrash onClick={suppressClick}/>
          </Col>
        );
      }
      return (
    <Card className={className} bg={bg} text={variant} >
    <Accordion>
      <Accordion.Toggle as={Card.Header}  eventKey="0" className="mb-2">
        <Row>
          <Col md="auto">
            {label}
          </Col>
          {suppress}
        </Row>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <ListGroup variant="flush">
          {buildList(list)}
      </ListGroup>
      </Accordion.Collapse>
    </Accordion >
  </Card>
  )}

}

export default KeyList;
