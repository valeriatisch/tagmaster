import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";

class Navbar extends Component {
    state = {};
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
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/impressum" component={Impressum} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}

export default Navbar;