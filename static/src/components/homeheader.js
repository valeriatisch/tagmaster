import React, { Component } from "react";
import logo from "../ressources/tagmastericon.png"
import { Container, Row, Col, Image, ListGroup, Table, Button, Modal } from 'react-bootstrap';
import {BrowserView, MobileView} from 'react-device-detect';

class Header extends Component{
    
    render(){
        return(
          <>
          <BrowserView>
            <div class="container text-center">
              <h1 style={{fontSize:"70px"}}>Welcome to</h1>
              <img src={logo} alt="Tagmastericon" style={{height:"450px",marginTop:"10px"}}></img>
              <h1 style={{fontSize:"40px"}}>What is it?</h1>
              <p style={{fontSize:"20px"}}>Tagmaster is an app for labelling pictures most commonly used for training Image Recognition AIs. </p>
            </div>
          </BrowserView>
          <MobileView>
              <Container fluid>
                <Row>
                  <Col>
                    <h1 style={{fontSize:"70px",textAlign:"center"}}>Welcome to</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image src={logo} alt="Tagmastericon" style={{marginTop:"10px", width:"100%"}}/>
                  </Col>
                </Row>
                <h1 style={{fontSize:"40px",textAlign:"center"}}>What is it?</h1>
                <p style={{fontSize:"20px",textAlign:"center"}}>Tagmaster is an app for labelling pictures most commonly used for training Image Recognition AIs. </p>
              </Container>
          </MobileView>
          </>
        )
    }
}

export default Header;