import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import logo from "../ressources/navbar-logo.png";
import { Nav, Navbar } from "react-bootstrap";
import Routing from "./routing";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import checkAuth from "./checkAuth.js";
import Authentication, { logout } from "./authentication";

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

    /*  console.log("auth token in navbar: ", this.props.authToken); */

    return (
      <>
        <style>
          {
            ".login-button{margin-right:100%;width:150px;border:1px solid #efeb53;text-align:center;background-color:#282828;color:#efeb53} .login-button:hover{background-color:#3F3F3F;color:#efeb53}"
          }
        </style>
        <Navbar
          expand="md"
          style={{
            backgroundColor: "#191919",
            borderBottom: "1px solid #454545",
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
            <Nav className="mr-auto" style={{}}>
              <Nav.Link href="/" style={{ color: "#efeb53" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/projects" style={{ color: "#efeb53" }}>
                Projects
              </Nav.Link>
              <Nav.Link href="/contact" style={{ color: "#efeb53" }}>
                Contact
              </Nav.Link>
              <Nav.Link href="/impressum" style={{ color: "#efeb53" }}>
                About
              </Nav.Link>
            </Nav>
            <Nav className="navbar-right">
              {this.props.authToken == true ? (
                <Link to={"/"}>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="btn btn-lg login-button"
                    role="button"
                    aria-pressed="true"
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="btn btn-lg login-button"
                    role="button"
                    aria-pressed="true"
                  >
                    Log in
                  </button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default ownNavbar;
