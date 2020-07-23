import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./newProject.css";

class newProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tags: [],
      description: "",
    };
  }

  updateTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  updateTags = (event) => {
    this.setState({
      tags: event.target.value.split(","),
    });
  };
  updateDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="createP">
          <form>
            <h2 style={{ marginLeft: "15px", color: "#efeb53" }}>
              Create a new Project
            </h2>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Title:</span>
              </div>
              <input
                type="text"
                class="form-control"
                name="title"
                value={this.state.title}
                onChange={this.updateTitle}
                required
              ></input>
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Tags:</span>
              </div>
              <input
                type="text"
                class="form-control"
                name="tags"
                value={this.state.tags}
                onChange={this.updateTags}
                required
              ></input>
            </div>
            <div
              style={{ color: "grey", marginLeft: "70px", marginTop: "-10px" }}
            >
              (divide tags with ",")
            </div>
            <br />

            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Description:</span>
              </div>
              <textarea
                class="form-control description"
                name="description"
                value={this.state.description}
                onChange={this.updateDescription}
              ></textarea>
            </div>

            <button class="btn" type="submit">
              Create Project
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default newProject;
