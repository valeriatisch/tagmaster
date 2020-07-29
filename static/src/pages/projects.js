import React, { Component } from "react";
import Projectpreview from "../components/projectpreview";
import picture1 from "../ressources/crosswalkwithcar.jpg";
import picture2 from "../ressources/citycrosswalk.jpg";
import picture3 from "../ressources/kooiker.jpeg";
import picture4 from "../ressources/beagle.jpg";
import picture5 from "../ressources/dolphin1.png";
import picture6 from "../ressources/dolphin2.png";
import picture7 from "../ressources/giraffe.jpg";
import picture8 from "../ressources/lion.jpg";
import uploadPicture from "../ressources/upload-picture.png";
import fetchProjectApi, {
  useFetch,
  usePicture,
} from "../components/fetchProjectApi";
import AuthApi from "../components/AuthApi";
import { Link } from "react-router-dom";

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
            <style>
              {
                "body { background-color: #191919; color: #CBCBCB} h1{color:#efeb53}"
              }
            </style>
            <h1 className="text-center">All Projects</h1>
            {data.map((p) => (
              <Link to={`/project/${p.id}`}>
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
              </Link>
            ))}
            <Link to={"/newProject"}>
              <button
                type="submit"
                className="button"
                style={{ width: "500px" }}
              >
                New Project
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
