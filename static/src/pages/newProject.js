import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap"

import "../css/newProject.css";


class newProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            tags: [],
            description: ""
        };
    }

    updateTitle = (event) =>{
        this.setState({
            title: event.target.value
          });
    }
    updateTags = (event) =>{
        this.setState({
            tags: event.target.value.split(",")
          });
    } 

    render() {
        return (
            <>
            <div className="createP">
                <form>
                    <h2 style={{marginLeft:"15px",color:"#efeb53"}}>Create a new Project</h2>
                    <div class="input-group" style={{marginLeft:"10px", marginRight:"10px"}}>
                        <div class="input-group-prepend">
                            <span class="input-group-text">Title:</span>
                        </div>
                        <input type="text" class="form-control" name="title" style={{maxWidth:"95%"}}
                            value={this.state.title} onChange={this.updateTitle} required></input>
                    </div>
                    <div class="input-group" style={{marginLeft:"10px", marginRight:"10px"}}>
                        <div class="input-group-prepend">
                            <span class="input-group-text">Tags:</span>
                        </div>
                        <input type="text" class="form-control" name="tags" style={{maxWidth:"95%"}}
                            value={this.state.tags} onChange={this.updateTags} required></input>
                    </div>
                    <div style={{color:"grey",marginLeft:"70px",marginTop:"-10px"}}>(divide tags with ",")</div>
                    <br/>
                    <button class="btn" type="submit" style={{marginLeft:"50px",width:"25%"}}>Create Project</button>
                </form>
            </div>
            </>
        );
    }
}

export default newProject;