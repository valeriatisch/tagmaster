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
            <div className="container col-auto" style={{padding:"0px"}}>
                <style>{'a { color: #efeb53; fontSize:15px } a:hover{ color:white }'}</style>
                <nav className="navbar sticky-top navbar-expand-lg" style={{backgroundColor:"#191919",borderBottom:"2px solid #2e2d2d"}}>
                    <a className ="nav-link mr-3 h1" style={{marginTop:"-20px",marginBottom:"-10px"}}>
                        <Link to={"/"} className="nav-link">
                            <img src={logo} height="45px"/>
                        </Link>
                    </a>
                    <div className="navbar-nav mr-auto">
                        <a className ="mr-3">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </a>
                        <a className ="mr-3">
                            <Link to={"/contact"} className="nav-link">
                                Contact
                            </Link>
                            </a>
                        <a className ="mr-auto">
                            <Link to={"/impressum"} className="nav-link">
                                About
                            </Link>
                        </a>
                    </div>
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