import React, { Component } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <style>
          {"body { background-color: #191919; color: #CBCBCB} h1{color:#efeb53}"}
          {".card {border-color: #efeb53; border-width: 2px; background-color: #191919}"}
        </style>
        <Row style={{"marginTop": "50px"}}>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h4>Upload Images</h4>
                <p style={{"textAlign": "justify"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis pharetra tortor, a fermentum lacus. Praesent aliquam velit nulla, id laoreet ex varius a. Sed eu semper erat. Aenean egestas dignissim felis vehicula fermentum. Curabitur commodo dolor vel lacus faucibus molestie quis vel tellus. Phasellus eros orci, tincidunt eu ante in, lobortis accumsan nisi. Aliquam a consequat ligula, quis venenatis tellus. Cras dapibus convallis tincidunt. Phasellus mattis dolor metus, non tempor quam laoreet id.
                </p>
                <Button style={{"align": "center"}}>Upload</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h4>Label Images</h4>
                <p style={{"textAlign": "justify"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis pharetra tortor, a fermentum lacus. Praesent aliquam velit nulla, id laoreet ex varius a. Sed eu semper erat. Aenean egestas dignissim felis vehicula fermentum. Curabitur commodo dolor vel lacus faucibus molestie quis vel tellus. Phasellus eros orci, tincidunt eu ante in, lobortis accumsan nisi. Aliquam a consequat ligula, quis venenatis tellus. Cras dapibus convallis tincidunt. Phasellus mattis dolor metus, non tempor quam laoreet id.
                </p>
                <Button style={{"align": "center"}}>Label</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;