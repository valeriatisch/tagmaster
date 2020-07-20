import React, { Component } from "react";
import { Container, Row, Col, Image, ListGroup, Table, Button, Modal } from 'react-bootstrap';
import { Trash, TabletLandscape } from 'react-bootstrap-icons';
import {BrowserView, MobileView, isBrowser, isMobile, TabletView} from 'react-device-detect';

/*TODO:
  Style des Modals an die Seite anpassen
*/
class LabelImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ogwidth : 0,
      ogheight: 0,
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
    const that = this;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      that.setState({ogwidth: canvas.width,ogheight: canvas.height});
      const ctx = canvas.getContext("2d");
    }
    
    const table = this.refs.tabelle;
    var zoom = setInterval(function(){
      if(canvas.width != img.width){
        canvas.width = img.width;
        canvas.height = img.height;
      }
    },10);
  }

  componentDidUpdate(){
    const canvas = this.refs.canvas;
    const img = this.refs.img;
    canvas.width = img.width;
    canvas.height = img.height;
  }

  render() {
    
    return (
    <div style={{backgroundColor:"#191919"}}>
      <style>{"body { background-color: #191919}"}</style>
      <BrowserView>
        <Container style={{marginTop: "40px"}}>
          <Row>
            <Col>
              <div>
                <Image ref="img" style={{"position": "absolute", "top": "0px", "left": "0px", "width": "100%", "marginBottom":"15px"}} src={this.props.imgsrc} fluid rounded/>
                <canvas onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={(e) => this.onMouseUp(e)} onMouseMove={(e) => this.onMouseMove(e)} 
                        onTouchStart={(e) => this.onTouchStart(e)} onTouchEnd={(e) => this.onTouchEnd(e)} onTouchMove={(e) => this.onTouchMove(e)}
                        style={{"position": "absolute", "top": "0px", "left": "0px"}} ref="canvas" height={425} />
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
                      <tr onMouseEnter={() => this.startHoverOrTouching(i)} onMouseLeave={() => this.stopHover()} onTouchStart={() => this.startHoverOrTouching(i)}>  
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
                {this.props.imageLabels.map(label =>
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
      </BrowserView>
      <MobileView>
        <Container style={{"margin-top": "40px"}}>
          <Row>
            <Col>
                <Image ref="img" style={{"top": "0px", "left": "0px", "width": "100%"}} src={this.props.imgsrc} fluid rounded/>
                <canvas onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={(e) => this.onMouseUp(e)} onMouseMove={(e) => this.onMouseMove(e)} 
                    onTouchStart={(e) => this.onTouchStart(e)} onTouchEnd={(e) => this.onTouchEnd(e)} onTouchMove={(e) => this.onTouchMove(e)}
                    style={{"position": "absolute", "top": "0px", "left": "0px", "marginLeft":"15px", "touch-action":"none"}} ref="canvas" height={425}/>
            </Col>
          </Row>
          <Row>
            <Col>
                <Table bordered hover variant="dark" ref="tabelle" style={{marginTop:"10px"}}>
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
                        <tr onMouseEnter={() => this.startHoverOrTouching(i)} onMouseLeave={() => this.stopHover()} onTouchStart={() => this.startHoverOrTouching(i)}>  
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
                {this.props.imageLabels.map(label =>
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
      </MobileView>
    </div>
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

  startHoverOrTouching(i) {
    this.clearCanvas();
    const tag = this.state.tags[i];
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const faktor = canvas.height/this.state.ogheight;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0000FF";
    ctx.strokeRect(tag.x1*faktor, tag.y1*faktor, (tag.x2 - tag.x1)*faktor , (tag.y2 - tag.y1)*faktor );
    
  }

  stopHover() {
    if(isBrowser){
      this.clearCanvas();
    }
  }

  addTag(t) {
    this.handleClose();
    this.clearCanvas();
    const canvas = this.refs.canvas;
    const {x1, y1, x2, y2} = this.state;
    const faktor = canvas.height/this.state.ogheight;
    const tag = {label: t, x1: x1/faktor, y1: y1/faktor, x2: x2/faktor, y2: y2/faktor};
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
    this.clearCanvas();

    const {x, y} = this.getPos(e);

    this.setState({x1: x});
    this.setState({y1: y});
    this.setState({drawing: true});
  }
  
  onMouseMove(e) {
    if (!this.state.drawing) {
      return;
    }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const {x, y} = this.getPos(e);

    const x1 = this.state.x1;
    const y1 = this.state.y1;

    
    this.clearCanvas();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, x - x1, y - y1);
  }

  onMouseUp(e) {
    const {x, y} = this.getPos(e);
    if (Math.abs(this.state.x1-x) < 5 || Math.abs(this.state.y1-y) < 5){
      this.setState({drawing: false});
      this.clearCanvas();
    }
    else{
      this.setState({drawing: false, show: true});
      
      this.setState({x2: x});
      this.setState({y2: y});
    }
  }

  onTouchStart(e){
    this.clearCanvas();
    var touch = e.touches[0];
    const {x, y} = this.getPos(touch);

    this.setState({x1: x});
    this.setState({y1: y});
    this.setState({drawing: true});
  }

  onTouchMove(e){
    if (!this.state.drawing) {
      return;
    }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d")

    var touch = e.touches[0];
    const {x, y} = this.getPos(touch);
    const x1 = this.state.x1;
    const y1 = this.state.y1;

    this.clearCanvas();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, x - x1, y - y1);
  }

  onTouchEnd(e){
    var touch = e.changedTouches[0]
    const {x, y} = this.getPos(touch);

    if (Math.abs(this.state.x1-x) < 5 || Math.abs(this.state.y1-y) < 5){
      this.setState({drawing: false});
      this.clearCanvas();
      
    }
    else{
      this.setState({drawing: false, show: true});
      
      this.setState({x2: x});
      this.setState({y2: y});
    }
  }
  
}
export default LabelImage;