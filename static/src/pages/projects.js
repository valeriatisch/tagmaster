import React, { Component } from "react";
import Projectpreview from "../components/projectpreview";
import picture1 from "../ressources/crosswalkwithcar.jpg";
import picture2 from "../ressources/citycrosswalk.jpg";
import uploadPicture from "../ressources/upload-picture.png";
import fetchProjectApi, {
  useFetch,
  usePicture,
} from "../components/fetchProjectApi";
import AuthApi from "../components/AuthApi";
import { Link } from "react-router-dom";
import "../css/projects.css"


export default function Projects() {
  const { data, loading } = useFetch("/api/projects/");

  const { picture, loadPic } = usePicture("/api/images/1/file");

  function convertTag(params) {
    const string = params.split(",");
    return string;
  }
  /*   console.log("project 1 fetch", useFetch("/api/projects/1")); */

  /*  console.log(data); */
  return (
    <div>
      <div>
        {loading ? null : (
          <div>
            <h1 className="text-center">All Projects</h1>
            <div className="content">
              {data.map((p) => (
                <Link to={`/project/${p.id}`}>
                  <div className="project-view">
                    <Projectpreview
                      title={p.name}
                      key={p.id}
                      pid={p.id}
                      // PROBLEM tags are given out "tag1, tag2, tag3" but instead need to be like this "tag1", "tag2", "tag3" // Solution convert to array with str.split(')
                      tags={convertTag(p.tags)}
                      numberofpictures={p.images.length}
                      img1={loadPic ? { uploadPicture } : { picture }}
                      img2={picture2}
                    />
                  </div>
                </Link>
              ))}
              <Link to={"/newProject"}>
                <button
                  type="submit"
                  className="newproject-button"

                >
                  New Project
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
