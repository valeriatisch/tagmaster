import React, { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import fetchProjectApi, { getProjectDetails, activateProject } from "./fetchProjectApi";
import { downloadFile } from "./download";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      uploadCompleted: false,
      activeProject: false,
      projectCompleted: false,
      projectTags: {}
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
      <div style={{ backgroundColor: "#191919" }}>
        <Container>
          {(this.state.activeProject && this.state.projectCompleted) ? (<h1>Your Project is completed and ready to download!</h1>) : null}
          <Row>
            <Col>
              <h1
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  fontSize: "50px",
                }}
              >
                {this.props.title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: "24px", textAlign: "center" }}>
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
                {(!this.state.activateProject && (!this.state.projectCompleted)) ? (
                  <h2>Project is in Progress</h2>
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
                    <h3 style={{ marginTop: "10px" }}>Once the project is activated, no more images can be uploaded</h3>
                  </div>
                )}

                {this.state.uploadCompleted ? <h1>uploadCompleted!</h1> : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
