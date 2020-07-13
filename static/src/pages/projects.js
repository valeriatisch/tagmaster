import React, { Component } from "react";
import ReactDOM from 'react-dom'
import axios from 'axios';

import {
  Input,
} from "mdbreact";
import Projectpreview from "../components/projectpreview";
import picture1 from "../ressources/crosswalkwithcar.jpg"
import picture2 from "../ressources/citycrosswalk.jpg"
import picture3 from "../ressources/kooiker.jpeg"
import picture4 from "../ressources/beagle.jpg"
import picture5 from "../ressources/dolphin1.png"
import picture6 from "../ressources/dolphin2.png"
import picture7 from "../ressources/giraffe.jpg"
import picture8 from "../ressources/lion.jpg"
import projectList from "./projects.json";


class Projects extends Component{
  constructor(props) {
    super(props);
    this.state = {
      proj: [],
      search: ""
    };
  }
  
      renderProject = project => {
        const { search } = this.state;
        let iconObj =
      {"picture1": picture1, "picture2": picture2, "picture3": picture3, "picture4": picture4, "picture5": picture5, "picture6": picture6, "picture7": picture7, "picture8": picture8}
    
        return (
            <Projectpreview title = {project.name} creator={project.creator} tag1={project.tag1} tag2={project.tag2} tag3={project.tag3} id={project.id}
            numberoftags={project.numberoftags} numberofpictures={project.numberofpictures} img1={iconObj[project.img1]} img2= {iconObj[project.img2]}
            description={project.description}/>
        );
      };
    
      onchange = e => {
        this.setState({ search: e.target.value });
      };
    
      render() {
       
    
        const { search } = this.state;
        
        const filteredProjects = projectList.filter(project => {
          return project.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    
        return (
          <div className="flyout">
            <main style={{ marginTop: "4rem" }}>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                  </div>
                  <div className="col">
                    <Input
                      label="Search Project" 
                      icon="search"
                      onChange={this.onchange}
                    />
                  </div>
                  <div className="col" />
                </div>
                <div className="row">
                  {filteredProjects.map(project => {
                    return this.renderProject(project);
                  })}
                </div>
              </div>
            </main>
            
          </div>
        );
      }
    }
export default Projects;
