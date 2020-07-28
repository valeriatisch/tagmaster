import React, { useState, useMemo, Component } from "react";
import Home from "../pages/home";
import Impressum from "../pages/impressum";
import Contact from "../pages/contact";
import Logout from "../pages/logout";
import Signup from "../pages/signup";
import newProject from "../pages/newProject";
import Projectpage from "../pages/projectpage";
import logo from "../ressources/navbar-logo.png";
import Projects from "../pages/projects.js";
import Profile from "../pages/profile.js";
import Accountpage from "../pages/accountpage";
import Label from "../pages/label";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext.js";
import AuthApi from "./AuthApi";
import Login from "../pages/login";

export default function Routing() {
  const authApi = React.useContext(AuthApi);
  return (
    <Switch>
      <RouteRegistration path="/login" component={Login} />
      {/*  {!authApi.auth && <RouteRegistration path="/signup" component={Signup} />} */}
      <RouteRegistration path="/signup" component={Signup} />
      <Route exact path="/" component={Home} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/contact" component={Contact} />
      <Route path="/logout" component={Logout} />
      <Route path="/newProject" component={newProject} />
      <RouteProtected path="/projects" component={Projects} />
      <RouteProtected path="/project/:id" component={Projectpage} />
      <Route path="/accountpage" component={Accountpage} />
      <Route path="/label" component={Label} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}

const RouteRegistration = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authApi.auth ? <Component {...props} /> : <Redirect to="/projects" />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        authApi.auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
