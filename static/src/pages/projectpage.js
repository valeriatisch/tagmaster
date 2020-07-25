import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Project from "../components/project.js";

class Register extends Component {
  render() {
    return (
      <>
        <Project
          title="Animals"
          description="Label different animals from your everyday pets to exotic wildlife."
          tags={[
            "dog",
            "cat",
            "bird",
            "snake",
            "lion",
            "seal",
            "bug",
            "spider",
            "fish",
          ]}
        />
      </>
    );
  }
}

export default Register;
