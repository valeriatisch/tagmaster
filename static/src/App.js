// App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import ProfileArea from "./pages/ProfileArea";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {}
  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route
            exact
            path={"/home"}
            render={(props) => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            exact
            path={"/ProfileArea"}
            render={(props) => (
              <ProfileArea
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
