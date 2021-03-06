import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Table,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";
import { Trash, TabletLandscape } from "react-bootstrap-icons";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  TabletView,
} from "react-device-detect";
import { sendLabel } from "./fetchLabelApi";
import { getNextImage, getImage, getImageDetails } from "./fetchImageApi";
import { trunc } from 'mathjs';
import ooi from "../ressources/out-of-images.png";


/*TODO:
  Style des Modals an die Seite anpassen
*/
class LabelImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logError: false,
      height: 0,
      ogwidth: 0,
      ogheight: 0,
      tags: [],
      idTags: [],
      show: false,
      pictureId: null,
      drawing: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      picture: null,
    };
  }

  printTags() {
    let ausgabe = [];
    let tags = this.state.idTags;
    let colors = [
      "#0247FE",
      "green",
      "#FE2712",
      "#FB9902",
      "#20B2AA",
      "#FF69B4",
      "darkviolet",
    ];

    for (let i = 0; i < tags.length; i++) {
      let badge = (
        <Badge
          variant="primary"
          style={{
            backgroundColor: colors[i % colors.length],
            marginRight: "5px",
          }}
        >
          {tags[i]}
        </Badge>
      );
      ausgabe.push(badge);
    }
    return ausgabe;
  }

  async componentDidMount() {

    const nextImg = await getNextImage();
    console.log(nextImg);

    const nextImgId = nextImg.id;
    const nextImgTags = nextImg.tags;
    this.setState({ pictureId: nextImgId });

    const imgDetails = await getImageDetails(`/api/images/${nextImgId}`)
    console.log("imgDetails", imgDetails);
    let imgTags = imgDetails.tags;
    /* imgTags = JSON.stringify(imgTags); */
    const imgUrl = imgDetails.url;
    console.log("url", imgUrl);

    if (imgTags) {
      imgTags = imgTags.replace(/"/g, '');
      let array = imgTags.split(',');
      console.log("imgTags output: ", array);
      this.setState({ idTags: array });

      const picture = await getImage(`${imgUrl}`);
      this.setState({ picture })
    }

    const canvas = this.refs.canvas;
    const img = this.refs.img;
    const that = this;
    const container = this.refs.container;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      that.setState({ ogwidth: img.naturalWidth, ogheight: img.naturalHeight });
      const ctx = canvas.getContext("2d");
      that.setState({
        height: img.height
      })
    };

    const table = this.refs.tabelle;
    var zoom = setInterval(function () {
      if (canvas.width != img.width) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
    }, 10);

    window.addEventListener('resize', () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas;
    const img = this.refs.img;
    canvas.width = img.width;
    canvas.height = img.height;
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ logError: true });
    // You can also log the error to an error reporting service
  }

  updateDimensions() {
    const img = this.refs.img;
    this.setState({
      height: img.height
    })
  };

  render() {
    const handleLabelSubmit = async () => {
      console.log("submitting tags...");
      console.log("state: ", this.state);

      console.log("map through obj");
      let body = [];
      this.state.tags.map(async (x) => {
        console.log("my obj element: ", x);
        let x1C = parseInt(x.x1);
        let y1C = parseInt(x.y1);
        let x2C = parseInt(x.x2);
        let y2C = parseInt(x.y2);
        const obj = {
          name: x.label,
          x1: x1C,
          y1: y1C,
          x2: x2C,
          y2: y2C,
        };
        body.push(obj);
      });
      const sendLabelData = await sendLabel(body, `/api/images/${this.state.pictureId}/label`);
      if (sendLabelData.message === "ok") {
        console.log("label data sent");
      } else {
        console.log("error : label data not sent");
      }

      window.location.reload(false);
    }

    return (
      <div>
        {
          this.state.logError ? <h1>Something went wrong</h1> : (
            <div style={{ backgroundColor: "#191919" }}>
              <style>{"body { background-color: #191919}"}</style>
              <BrowserView>
                <Container style={{ marginTop: "40px", height: this.state.height }}>
                  <Row>
                    <Col>
                      <div>
                        <Image
                          ref="img"
                          style={{
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "100%",
                            marginBottom: "15px",
                          }}
                          src={this.state.picture ? this.state.picture : ooi}
                          fluid
                          rounded
                        />
                        <canvas
                          onMouseDown={(e) => this.onMouseDown(e)}
                          onMouseUp={(e) => this.onMouseUp(e)}
                          onMouseMove={(e) => this.onMouseMove(e)}
                          onTouchStart={(e) => this.onTouchStart(e)}
                          onTouchEnd={(e) => this.onTouchEnd(e)}
                          onTouchMove={(e) => this.onTouchMove(e)}
                          style={{ position: "absolute", top: "0px", left: "0px" }}
                          ref="canvas"
                          height={425}
                        />
                      </div>
                    </Col>
                    <Col>
                      <Row>
                        <Col style={{ fontSize: "20px", marginBottom: "10px" }}>
                          Tags: {this.printTags()}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Table striped bordered hover variant="dark">
                            <thead>
                              <tr>
                                <th>
                                  Tag
                            <Button
                                    onClick={handleLabelSubmit}
                                    style={{
                                      width: "80px",
                                      border: "1px solid #efeb53",
                                      color: "#efeb53",
                                      "background-color": "transparent",
                                    }}
                                    size="sm"
                                    className="float-right"
                                  >
                                    Done
                            </Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.tags.map((e, i) => {
                                return (
                                  <tr
                                    onMouseEnter={() => this.startHoverOrTouching(i)}
                                    onMouseLeave={() => this.stopHover()}
                                    onTouchStart={() => this.startHoverOrTouching(i)}
                                  >
                                    <td>
                                      {e.label}
                                      <Button
                                        onClick={() => this.removeTag(i)}
                                        variant="outline-danger"
                                        size="sm"
                                        style={{ width: "50px" }}
                                        className="float-right"
                                      >
                                        <Trash />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <style>
                    {
                      ".modal-content{border:2px solid yellow} .modal-dialog {position: relative;top: 15%} button1:hover{background-color:#3F3F3F}"
                    }
                  </style>
                  <Modal
                    show={this.state.show}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header
                      style={{
                        backgroundColor: "#191919",
                        borderBottom: "1px solid #efeb53",
                      }}
                    >
                      <Modal.Title style={{ color: "#efeb53" }}>
                        Select Tag
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#191919" }}>
                      <ListGroup variant="flush">
                        {this.state.idTags.map((label) => (
                          <ListGroup.Item
                            style={{ color: "white", backgroundColor: "#454D55" }}
                            action
                            onClick={() => this.addTag(label)}
                          >
                            {label}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Modal.Body>
                    <Modal.Footer
                      style={{
                        backgroundColor: "#191919",
                        borderTop: "1px solid #efeb53",
                      }}
                    >
                      <Button
                        className="button1"
                        style={{
                          color: "#efeb53",
                          backgroundColor: "#282828",
                          border: "1px solid #efeb53",
                        }}
                        onClick={() => this.handleClose()}
                      >
                        Cancel
                </Button>
                    </Modal.Footer>
                  </Modal>
                </Container>
              </BrowserView>
              <MobileView>
                <Container style={{ "margin-top": "40px" }}>
                  <Row>
                    <Col>
                      <Image
                        ref="img"
                        style={{ top: "0px", left: "0px", width: "100%" }}
                        src={this.state.picture}
                        fluid
                        rounded
                      />
                      <canvas
                        onMouseDown={(e) => this.onMouseDown(e)}
                        onMouseUp={(e) => this.onMouseUp(e)}
                        onMouseMove={(e) => this.onMouseMove(e)}
                        onTouchStart={(e) => this.onTouchStart(e)}
                        onTouchEnd={(e) => this.onTouchEnd(e)}
                        onTouchMove={(e) => this.onTouchMove(e)}
                        style={{
                          position: "absolute",
                          top: "0px",
                          left: "0px",
                          marginLeft: "15px",
                          "touch-action": "none",
                        }}
                        ref="canvas"
                        height={425}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table
                        bordered
                        hover
                        variant="dark"
                        ref="tabelle"
                        style={{ marginTop: "10px" }}
                      >
                        <thead>
                          <tr>
                            <th>
                              Tag
                        <Button
                                onClick={handleLabelSubmit}
                                style={{
                                  width: "80px",
                                  border: "1px solid #efeb53",
                                  color: "#efeb53",
                                  "background-color": "transparent",
                                }}
                                size="sm"
                                className="float-right"
                              >
                                Done
                        </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.idTags.map((e, i) => {
                            return (
                              <tr
                                onMouseEnter={() => this.startHoverOrTouching(i)}
                                onMouseLeave={() => this.stopHover()}
                                onTouchStart={() => this.startHoverOrTouching(i)}
                              >
                                <td>
                                  {e.label}
                                  <Button
                                    onClick={() => this.removeTag(i)}
                                    variant="outline-danger"
                                    size="sm"
                                    style={{ width: "50px" }}
                                    className="float-right"
                                  >
                                    <Trash />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <style>
                    {
                      ".modal-content{border:2px solid yellow} .modal-dialog {position: relative;top: 15%} button1:hover{background-color:#3F3F3F}"
                    }
                  </style>
                  <Modal
                    show={this.state.show}
                    onHide={() => this.handleClose()}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header
                      style={{
                        backgroundColor: "#191919",
                        borderBottom: "1px solid #efeb53",
                      }}
                    >
                      <Modal.Title style={{ color: "#efeb53" }}>
                        Select Tag
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#191919" }}>
                      <ListGroup variant="flush">
                        {this.state.idTags.map((label) => (
                          <ListGroup.Item
                            style={{ color: "white", backgroundColor: "#454D55" }}
                            action
                            onClick={() => this.addTag(label)}
                          >
                            {label}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Modal.Body>
                    <Modal.Footer
                      style={{
                        backgroundColor: "#191919",
                        borderTop: "1px solid #efeb53",
                      }}
                    >
                      <Button
                        className="button1"
                        style={{
                          color: "#efeb53",
                          backgroundColor: "#282828",
                          border: "1px solid #efeb53",
                        }}
                        onClick={() => this.handleClose()}
                      >
                        Cancel
                </Button>
                    </Modal.Footer>
                  </Modal>
                </Container>
              </MobileView>
            </div>
          )
        }
      </div>
    );
  }

  handleClose() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({ show: false });
  }

  clearCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  startHoverOrTouching(i) {
    this.clearCanvas();
    const tag = this.state.tags[i];
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const faktor = canvas.height / this.state.ogheight;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0000FF";
    ctx.strokeRect(
      tag.x1 * faktor,
      tag.y1 * faktor,
      (tag.x2 - tag.x1) * faktor,
      (tag.y2 - tag.y1) * faktor
    );
  }

  stopHover() {
    if (isBrowser) {
      this.clearCanvas();
    }
  }

  addTag(t) {
    this.handleClose();
    this.clearCanvas();
    const canvas = this.refs.canvas;
    const { x1, y1, x2, y2 } = this.state;
    const faktor = canvas.height / this.state.ogheight;
    const tag = {
      label: t,
      x1: x1 / faktor,
      y1: y1 / faktor,
      x2: x2 / faktor,
      y2: y2 / faktor,
    };
    this.state.tags.push(tag);
  }

  removeTag(i) {
    var tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
    this.clearCanvas();
  }

  getPos(e) {
    const bx = e.target.getBoundingClientRect();
    const x = e.clientX - bx.left;
    const y = e.clientY - bx.top;
    return { x, y };
  }

  onMouseDown(e) {
    this.clearCanvas();

    const { x, y } = this.getPos(e);

    this.setState({ x1: x });
    this.setState({ y1: y });
    this.setState({ drawing: true });
  }

  onMouseMove(e) {
    if (!this.state.drawing) {
      return;
    }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const { x, y } = this.getPos(e);

    const x1 = this.state.x1;
    const y1 = this.state.y1;

    this.clearCanvas();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, x - x1, y - y1);
  }

  onMouseUp(e) {
    const { x, y } = this.getPos(e);
    if (Math.abs(this.state.x1 - x) < 5 || Math.abs(this.state.y1 - y) < 5) {
      this.setState({ drawing: false });
      this.clearCanvas();
    } else {
      this.setState({ drawing: false, show: true });

      this.setState({ x2: x });
      this.setState({ y2: y });
    }
  }

  onTouchStart(e) {
    this.clearCanvas();
    var touch = e.touches[0];
    const { x, y } = this.getPos(touch);

    this.setState({ x1: x });
    this.setState({ y1: y });
    this.setState({ drawing: true });
  }

  onTouchMove(e) {
    if (!this.state.drawing) {
      return;
    }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    var touch = e.touches[0];
    const { x, y } = this.getPos(touch);
    const x1 = this.state.x1;
    const y1 = this.state.y1;

    this.clearCanvas();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, x - x1, y - y1);
  }

  onTouchEnd(e) {
    var touch = e.changedTouches[0];
    const { x, y } = this.getPos(touch);

    if (Math.abs(this.state.x1 - x) < 5 || Math.abs(this.state.y1 - y) < 5) {
      this.setState({ drawing: false });
      this.clearCanvas();
    } else {
      this.setState({ drawing: false, show: true });

      this.setState({ x2: x });
      this.setState({ y2: y });
    }
  }
}
export default LabelImage;
