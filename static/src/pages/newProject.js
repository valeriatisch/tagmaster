import React, { Component } from "react";
import { Button } from "react-bootstrap"


import "../css/newProject.css";


class newProject extends Component {
    render() {
        return (
        <div className="main createP">
            <form>
            <h2 style={{marginLeft:"15px",color:"#efeb53"}}>Create a new Project</h2>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Title:</span>
                </div>
                <input type="text" class="form-control" name="title"></input>
            </div>

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Tags:</span>
                </div>
                <input type="text" class="form-control" name="tags"></input>
            </div>
            <div style={{color:"grey",marginLeft:"70px",marginTop:"-10px"}}>(divide tags with ",")</div>
            <br/>

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description:</span>
                </div>
                <textarea class="form-control description" name="description"></textarea>
            </div>

            <button class="btn" type="submit">Create Project</button>
            </form>
        </div>
        );
    }
}

export default newProject;