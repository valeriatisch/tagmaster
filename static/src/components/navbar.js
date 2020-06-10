import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import logo from '../ressources/navbar-logo.png'

class Navbar extends Component {
    state = {};
    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{backgroundColor:"#191919"}}>
                    <a className ="navbar-nav mr-5 h1" style={{marginTop:"-10px",color:"#efeb53"}}>
                        <Link to={"/"} className="nav-link">
                            <img src={logo} height="50px"/>
                        </Link>
                    </a>
                    <a className ="navbar-nav mr-auto" style={{color:"white"}}>
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </a>
                    <a className ="navbar-nav mr-auto">
                        <Link to={"/contact"} className="nav-link">
                            Contact
                        </Link>
                        </a>
                    <a className ="navbar-nav mr-5">
                        <Link to={"/impressum"} className="nav-link">
                            About
                        </Link>
                    </a>
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