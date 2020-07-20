import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';

import Upload from "./uploadfile.js";

class Register extends Component {
    render() {
        return (
            <div style={{backgroundColor:"#191919"}}>
                <Container>
                    <Row>
                        <Col>
                            {this.props.title}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.props.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        
                        </Col>
                    </Row>
                </Container>
                <Upload/>
            </div>
        );
     }
}

export default Register;