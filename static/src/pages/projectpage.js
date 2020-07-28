import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Project from "../components/project.js";
import fetchProjectApi, { useFetch } from "../components/fetchProjectApi";

const Projectpage = ({ match, location }) => {
  const {
    params: { id },
  } = match;

  const { data, loading } = useFetch(`/api/projects/${id}`);

  console.log("data id is: ", data);

  return (
    <div>
      {loading ? (
        "loading..."
      ) : (
        <div>
          <style>
            {
              "body { background-color: #191919; color: #CBCBCB} h1{color:#efeb53}"
            }
          </style>
          <h1 className="text-center">Project</h1>
          <Project
            title={data.name}
            key={1}
            id={data.id}
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
        </div>
      )}
    </div>
  );
};

export default Projectpage;
