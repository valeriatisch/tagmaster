import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';

import Project from "../components/project.js";

class Register extends Component {
    render() {
        return (
            <>
                <Project title="Animals" tags={["dog","cat","bird","snake","lion","seal","bug","spider","fish"]}/>
            </>
        );
     }
}

export default Register;