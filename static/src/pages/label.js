import React, { Component } from "react";
import { Container, Row, Col, Image, ListGroup, Table, Button, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/*TODO:
  Style des Modals an die Seite anpassen
*/
class Label extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageLabels: ["cat", "dog", "bird"],
      tags: [],
      show: false,
      drawing: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const img = this.refs.img;
    img.onload = function() {
      canvas.width = img.width-4;
      canvas.height = img.height-4;
      const ctx = canvas.getContext("2d");
    }
  }

  render() {
    return (
      <Container style={{"margin-top": "40px"}}>
        <Row>
          <Col>
            <div style={{"background-color": "red"}}>
              <Image ref="img" style={{"position": "absolute", "top": "0px", "left": "0px", "width": "100%"}} src="https://source.unsplash.com/random" fluid />
              <canvas onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={(e) => this.onMouseUp(e)} onMouseMove={(e) => this.onMouseMove(e)} style={{border:"2px solid", "border-color": "yellow","position": "absolute", "top": "0px", "left": "0px"}} ref="canvas" height={425} />
            </div>
          </Col>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Tag
                    <Button onClick={() => window.location.reload(false)} style={{width: "80px", border: "1px solid #efeb53", color: "#efeb53", "background-color": "transparent"}} size="sm" className="float-right">Done</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.tags.map((e, i) => {
                  return (
                    <tr onMouseEnter={() => this.startHover(i)} onMouseLeave={() => this.stopHover()}>  
                      <td>
                        {e.label}
                        <Button onClick={() => this.removeTag(i)} variant="outline-danger" size="sm" style={{"width": "50px"}} className="float-right"><Trash /></Button></td>
                    </tr>
                  )}
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <style>{".modal-content{border:2px solid yellow} .modal-dialog {position: relative;top: 15%} button1:hover{background-color:#3F3F3F}"}</style>
        <Modal
              show={this.state.show}
              onHide={() => this.handleClose()}
              backdrop="static"
              keyboard={false}
            >
          <Modal.Header style={{backgroundColor:"#191919",borderBottom:"1px solid #efeb53"}}>
            <Modal.Title style={{"color": "#efeb53"}}>Select Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:"#191919"}}>
           <ListGroup variant="flush">
              {this.state.imageLabels.map(label =>
                <ListGroup.Item 
                style={{"color": "white","backgroundColor":"#454D55"}} 
                action 
                onClick={() => this.addTag(label)}
                >
                  {label}
                </ListGroup.Item>)
              }
            </ListGroup>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"#191919",borderTop:"1px solid #efeb53"}}>
            <Button className="button1" style={{"color":"#efeb53", "backgroundColor":"#282828", "border":"1px solid #efeb53"}} onClick={() => this.handleClose()}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>    
    );
  }

  handleClose() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({show: false});
  }

  clearCanvas() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  startHover(i) {
    const tag = this.state.tags[i];
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0000FF";
    ctx.strokeRect(tag.x1, tag.y1, tag.x2 - tag.x1, tag.y2 - tag.y1);
  }

  stopHover() {
    this.clearCanvas();
  }

  addTag(t) {
    this.handleClose();
    this.clearCanvas();
    const {x1, y1, x2, y2} = this.state;
    const tag = {label: t, x1: x1, y1: y1, x2: x2, y2: y2};
    this.state.tags.push(tag);
  }

  removeTag(i) {
    var tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
    this.clearCanvas();
  }

  getPos(e) {
    const bx = e.target.getBoundingClientRect();
    const x = e.clientX - bx.left;
    const y = e.clientY - bx.top;
    return {x, y};
  }

  onMouseDown(e) {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const {x, y} = this.getPos(e)
    this.setState({x1: x});
    this.setState({y1: y});
    this.setState({drawing: true});
  }

  onMouseUp(e) {
    const {x, y} = this.getPos(e);
    if (Math.abs(this.state.x1-x) < 5 || Math.abs(this.state.y1-y) < 5){
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");

      this.setState({drawing: false});
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
    }
    else{
      this.setState({drawing: false, show: true});
      
      this.setState({x2: x});
      this.setState({y2: y});
    }
  }

  onMouseMove(e) {
    if (!this.state.drawing) {
      return;
    }

    const {x, y} = this.getPos(e)
    const canvas = this.refs.canvas
    const x1 = this.state.x1;
    const y1 = this.state.y1;

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, x - x1, y - y1);
  }
}
export default Label;