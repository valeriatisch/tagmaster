import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap"
import fetchProjectApi, {
    createProject
} from "../components/fetchProjectApi";
import "../css/newProject.css";
import { withRouter, Redirect } from 'react-router-dom';


class newProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tags: [],
            description: ""
        };
    }

    updateTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }
    updateTags = (event) => {
        this.setState({
            tags: event.target.value.split(",")
        });
    }

    render() {

        const handleSubmit = async (event) => {
            event.preventDefault();
            console.log("project submitted: ", this.state);
            let myTags = JSON.stringify(this.state.tags);
            myTags = myTags.replace('[', '');
            myTags = myTags.replace(']', '');
            myTags = myTags.replace(/"/g, '');
            const obj = {
                name: this.state.title,
                tags: myTags
            }
            console.log("obj is: ", obj)
            const newProject = await createProject(obj);
            console.log("newProject is", newProject);
            if (newProject) {
                console.log("redirecting...")
                this.props.history.push(`/project/${newProject.id}`);
            } else {
                console.log("Project creation has failed");
            }

        }

        return (
            <>
                <div className="createP">
                    <form>
                        <h2 style={{ marginLeft: "15px", color: "#efeb53" }}>Create a new Project</h2>
                        <div className="input-group" style={{ marginLeft: "10px", marginRight: "10px" }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">Title:</span>
                            </div>
                            <input type="text" className="form-control" name="title" style={{ maxWidth: "95%" }}
                                value={this.state.title} onChange={this.updateTitle} required></input>
                        </div>
                        <div className="input-group" style={{ marginLeft: "10px", marginRight: "10px" }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">Tags:</span>
                            </div>
                            <input type="text" className="form-control" name="tags" style={{ maxWidth: "95%" }}
                                value={this.state.tags} onChange={this.updateTags} required></input>
                        </div>
                        <div style={{ color: "grey", marginLeft: "70px", marginTop: "-10px" }}>(divide tags with ",")</div>
                        <br />
                        <button className="btn" onClick={handleSubmit} type="submit" style={{ marginLeft: "50px", width: "25%" }}>Create Project</button>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(newProject);