import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import Logout from "../pages/logout";
import Login from "../pages/login";
import logo from "../ressources/navbar-logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  componentWillMount() {
    if (
      sessionStorage.getItem("access_token") != null &&
      sessionStorage.getItem("id_token") != null
    ) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="container col-auto" style={{ padding: "0px" }}>
        <style>
          {"a { color: #efeb53; fontSize:15px } a:hover{ color:white }"}
        </style>
        <style>
          {
            ".login-button{ color:#efeb53; background-color:#282828; border: 1px solid #efeb53 } .login-button:hover { background-color:#3F3F3F; color:#efeb53; border: 1px solid }"
          }
        </style>
        <nav
          className="navbar sticky-top navbar-expand-lg"
          style={{
            backgroundColor: "#191919",
            borderBottom: "2px solid #2e2d2d",
          }}
        >
          <a
            className="nav-link mr-3 h1"
            style={{ marginTop: "-20px", marginBottom: "-10px" }}
          >
            <Link to={"/"} className="nav-link">
              <img src={logo} height="45px" />
            </Link>
          </a>
          <div className="navbar-nav mr-auto">
            <a className="mr-3">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </a>
            <a className="mr-3">
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </a>
            <a className="mr-auto">
              <Link to={"/impressum"} className="nav-link">
                About
              </Link>
            </a>
          </div>
          <div className="navbar-nav navbar-right">
            <a className="mr-3">
              {this.state.loggedIn == true ? (
                <Link to={"/logout"} className="nav-link">
                  {" "}
                  Logout{" "}
                </Link>
              ) : (
                <Link to={"/login"} className="nav-link">
                  <button
                    type="button"
                    class="btn btn-lg login-button"
                    role="button"
                    aria-pressed="true"
                  >
                    Log in
                  </button>
                </Link>
              )}
            </a>
          </div>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/contact" component={Contact} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  }
}

export default Navbar;
