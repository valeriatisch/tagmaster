import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import Logout from "../pages/logout";
import Login from "../pages/login";

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
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/impressum"} className="nav-link">
                About
              </Link>
            </li>
            {this.state.loggedIn == true ? (
              <li>
                <Link to={"/logout"} className="nav-link">
                  {" "}
                  Logout{" "}
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} className="nav-link">
                  {" "}
                  Login{" "}
                </Link>
              </li>
            )}
          </ul>
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
