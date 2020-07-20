import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';

import Project from "../components/project.js";

class Register extends Component {
    render() {
        return (
            <>
                <Project title="hdf" description="hdfhdfhdf" tags={["dog","cat","bird"]}/>
            </>
        );
     }
}

export default Register;