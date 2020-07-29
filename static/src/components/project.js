import React, { Component } from "react";
import { Container, Row, Col, Badge, Alert } from "react-bootstrap";
import fetchProjectApi, { getProjectDetails, activateProject } from "./fetchProjectApi";
import { downloadFile } from "./download";
import "../css/project.css";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      uploadCompleted: false,
      activeProject: false,
      projectCompleted: false,
      projectTags: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const ID = this.props.id;
    const projectInfo = await getProjectDetails(`/api/projects/${ID}`);
    console.log("projectInfo: ", projectInfo);
    this.setState({ projectTags: projectInfo.tags });
    if (projectInfo.active) {
      this.setState({ activeProject: true });
    }
    if (projectInfo.done) {
      this.setState({ projectCompleted: true });
    }
    this.setState({ loading: false })
  }

  printTags() {
    let ausgabe = [];
    let tags = this.state.projectTags;
    let colors = [
      "#0247FE",
      "green",
      "#FE2712",
      "#FB9902",
      "#20B2AA",
      "#FF69B4",
      "darkviolet",
    ];

    tags = JSON.stringify(tags);
    tags = tags.replace(/ /g, '');
    tags = tags.replace(/"/g, '');
    let array = tags.split(',');

    for (let i = 0; i < array.length; i++) {
      let badge = (
        <Badge
          variant="primary"
          style={{
            backgroundColor: colors[i % colors.length],
            marginRight: "5px",
          }}
        >
          {array[i]}
        </Badge>
      );
      ausgabe.push(badge);
    }
    return ausgabe;
  }

  onChange = (e) => {
    this.setState({ pictures: e.target.files });
  };

  render() {

    const handleDownload = async (url) => {
      downloadFile(`/api/projects/${this.props.id}/export`)
    }

    const handleUpload = async (e) => {
      e.preventDefault();
      const pictures = this.state.pictures;
      const data = Array.from(pictures);
      data.map(async (p) => {
        let formData = new FormData();
        formData.append("file", p);

        const options = {
          method: "POST",
          body: formData,
        };
        await fetch(`/api/projects/${this.props.id}/images`, options);
        this.setState({ uploadCompleted: true });
        console.log("state is: ", this.state.uploadCompleted);
      });
    };

    const handleActivation = async () => {
      /* e.preventDefault(); */

      console.log("handleActivation");
      const ID = this.props.id;
      console.log("id: ", ID);
      const actObj = await activateProject(`/api/projects/${ID}/activate`);
      /* if (login.message === "ok") {
        setWrongCredentials(false);
        authApi.setAuth(true);
      } else {
        setWrongCredentials(true);
      } */
      console.log("actObj: ", actObj);

      this.setState({
        activeProject: true
      });


    }

    return (
      <div>
        {this.state.loading ? null : (
          <div style={{ backgroundColor: "#191919" }}>
            <Container className="card-container">
              {(this.state.activeProject && this.state.projectCompleted) ? (<div className="download-rdy-alert"><Alert variant={"success"}>Your Project is completed and ready to download!</Alert></div>) : null}
              {(this.state.activeProject && !this.state.projectCompleted) ? (<div className="download-rdy-alert"><Alert variant={"success"}>Your project is in progress</Alert></div>) : null}
              {(!this.state.activeProject && this.state.projectCompleted) ? (<div className="download-rdy-alert"><Alert variant={"warning"}>Once your project is activated you can't upload more pictures</Alert></div>) : null}
              <Row>
                <Col>
                  <h1
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      fontSize: "50px",
                      border: "solid",
                      paddingBottom: "10px",
                      width: "40%",
                    }}
                  >
                    {this.props.title}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingTop: "10px", fontSize: "24px", textAlign: "center" }}>
                  {this.printTags()}
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: "15px", textAlign: "center" }}>
                  <div style={{ backgroundColor: "#191919" }}>
                    <style>
                      {
                        ".button1{width:150px; color:#efeb53; background-color:#282828; border: 1px solid #efeb53 } .button1:hover { background-color:#3F3F3F; color:#efeb53; border: 1px solid }"
                      }
                    </style>
                    {!this.state.activeProject ? (
                      <form
                        onSubmit={this.onFormSubmit}
                        style={{ margin: "0 auto", width: "300px" }}
                      >
                        <div className="form-group files" style={{ width: "300px" }}>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                            onChange={this.onChange}
                            style={{ height: "200px", backgroundColor: "grey" }}
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={handleUpload}
                          className="btn button1"
                          style={{ width: "100px" }}
                        >
                          Upload
                    </button>

                      </form>
                    ) : null}
                    {(this.state.projectCompleted && this.state.activeProject) ? (
                      <button
                        type="submit"
                        className="btn button1"
                        style={{ width: "110px" }}
                        onClick={handleDownload}
                      >
                        Download
                      </button>
                    ) : null}
                    {this.state.activeProject ? null : (
                      <div> <button
                        type="submit"
                        onClick={handleActivation}
                        className="btn button1"
                        style={{ width: "100px", marginTop: "10px" }}
                      >
                        Activate Project
                    </button>
                      </div>
                    )}

                    {this.state.uploadCompleted ? (<div className="upload-alert"><Alert variant={"success"}>Upload Successfull</Alert></div>) : null}
                  </div>
                </Col>
              </Row>
            </Container>
          </div >
        )}
      </div>
    );
  }
}

export default Register;
