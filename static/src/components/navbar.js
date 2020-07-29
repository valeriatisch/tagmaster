import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import logo from "../ressources/navbar-logo.png";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Routing from "./routing";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import checkAuth from "./checkAuth.js";
import Authentication, { logout } from "./authentication";
import "../css/navbar.css";

class ownNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const handleLogout = async () => {
      await logout();
      this.props.auth(false);
    };

    return (
      <>
      <Navbar
      expand="md"
      style={{
        backgroundColor: "#191919",
        borderBottom: "1px solid #efeb53",
      }}
      >
      <Navbar.Brand href="/" style={{ marginTop: "-5px" }}>
      <img src={logo} height="50" />
      </Navbar.Brand>
      <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      style={{
        width: "70px",
        borderColor: "#efeb53",
        backgroundColor: "#3F3F3F",
      }}
      />
      <Navbar.Collapse id="basic-navbar-nav">

      {this.props.authToken == true ? (
        <React.Fragment>
          <Nav className="navbar-right ml-auto d-none d-md-block">       
            <NavDropdown title="user@email.com" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/label">Label</NavDropdown.Item>
              <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
              <NavDropdown.Divider />                 
              <NavDropdown.Item onClick={handleLogout} href="">Logout</NavDropdown.Item>
            </NavDropdown>            
          </Nav>
          <Nav className="navbar-right ml-auto d-md-none">
            <Nav.Link className="n-link d-flex justify-content-center" href="/profile">Profile</Nav.Link>
            <Nav.Link className="n-link d-flex justify-content-center" href="/label">Label</Nav.Link>
            <Nav.Link className="n-link d-flex justify-content-center" href="/projects">Projects</Nav.Link>
            <Nav.Link className="n-link d-flex justify-content-center" href="/login" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </React.Fragment>

        ) : (

        <React.Fragment>
          <Nav className="ml-auto d-none d-md-flex">
            <Nav.Link className="btn nav-btn btn-register" href="/signup">Sign Up</Nav.Link>
            <Nav.Link className="btn nav-btn btn-login" href="/login">Login</Nav.Link>
          </Nav>
          <Nav className="navbar-right ml-auto d-md-none">
            <Nav.Link className="n-link d-flex justify-content-center" href="/signup">Sign Up</Nav.Link>
            <Nav.Link className="n-link d-flex justify-content-center" href="/login">Login</Nav.Link>
          </Nav>
        </React.Fragment>
      )}

      </Navbar.Collapse>
      </Navbar>
      </>
    );
  }
}

export default ownNavbar;
