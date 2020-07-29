import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import uploadPicture from "../ressources/upload-picture.png";
import fetchProjectApi, {
  usePicture,
  useFetch,
  getProjectDetails
} from "./fetchProjectApi";

export default function Projectpreview(props) {
  const [state, setState] = useState({ picture: null, loadingPicture: true });

  const { data, loading } = useFetch(`/api/projects/${props.pid}`);
  /* console.log("loadingProject: ", loading) */
  /* console.log(loading ? null : data); */

  /*  const imageId = data.images[0];
   const { pictureOne, loadPicOne } = usePicture(`/api/images/${imageId}/file`);
   console.log("pictureOne: ", pictureOne); */
  useEffect(() => {
    setState({ picture: null, loadingPicture: true });

    //check if project data is fetched with loading
    if (!loading) {
      /* console.log("data:", data); */
      const imageId = data.images[0];
      const ImageIdTwo = data.images[1];
      if (imageId) {
        //fetch data
        fetch(`/api/images/${imageId}/file`)
          .then((res) => res.blob())
          .then((blob) => {
            setState({
              picture: URL.createObjectURL(blob),
              //tell state that picture is loaded
              loadingPicture: false,
            });
          });
      }
    }
  }, [loading]);

  if (!state.loadingPicture) {
    console.log("picute URL", state.picture);
  }

  // useEffect(async () => {
  //   const projectInfo = await getProjectDetails(`/api/projects/${props.pid}`);
  //   //Get Image IDs of Project
  //   console.log("projectInfo is: ", projectInfo);
  //   console.log("projectInfo Image ID: ", projectInfo.images);
  //   //et first two pictures of the project for the thumbnail
  //   const imageId = projectInfo.images[0];
  //   const { pictureOne, loadPicOne } = usePicture(`/api/images/${imageId}/file`);
  //   /*  const { pictureTwo, loadPicTwo } = usePicture(`/api/images/${projectInfo.images[1]}/file`); */
  //   console.log("pictureOne", pictureOne);
  // });

  return (
    <Container
      style={{
        backgroundColor: "#3D3D3D",
        color: "#efeb53",
        borderRadius: "10px",
        marginBottom: "5px",
        width: "30%",
        border: "2px solid #efeb53",
      }}
    >
      <Row>
        <Col
          style={{
            border: "2px solid #efeb53",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            textAlign: "center",
          }}
        >
          <b style={{ fontSize: "24px", color: "#efeb53" }}>
            {props.title}
          </b>
          <br />
        </Col>
      </Row>
      <Row style={{ marginBottom: "5px" }}>
        <Col style={{ fontSize: "20px", textAlign: "center" }}>
          <span className="badge badge-primary">{props.tags[0]}</span>
          <span className="badge badge-success" style={{ marginLeft: "5px" }}>
            {props.tags[1]}
          </span>
          <span className="badge badge-danger" style={{ marginLeft: "5px" }}>
            {props.tags[2]}
          </span>
          <span className="badge badge-warning" style={{ marginLeft: "5px" }}>
            {props.tags.length < 4
              ? ""
              : `+${props.tags.length - 3} more Tags`}
          </span>
          <span className="badge badge-info" style={{ marginLeft: "5px" }}>
            {props.numberofpictures} Pictures
          </span>
        </Col>
      </Row>
      <Row
        style={{
          border: "2px solid #efeb53",
          borderBottom: "none",
          borderRight: "none",
          borderLeft: "none",
        }}
      >
        <Col style={{ marginBottom: "10px" }}>
          <img
            src={state.loadingPicture ? uploadPicture : state.picture}
            className="rounded"
            style={{
              height: "90%",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          ></img>
        </Col>
      </Row>
    </Container>
  );
}