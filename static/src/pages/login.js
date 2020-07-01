import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./login.css";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  responseFacebook(response) {
    console.log(response);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const target = event.target;
    const name = target.name;
    axios
      .post(
        "http://localhost:3001/api/login	",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login ");

        // if (response.data.logged_in) {
        // this.props.handleSuccessfulAuth(response.data);
        //}
      })
      .catch((error) => {
        console.log("login error");
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login" style={{ color: "white" }}>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <div className="form-group" controlId="email" bsSize="large">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group" controlId="password" bsSize="large">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <div
              className="custom-control custom-checkbox"
              style={{
                zoom: "0.7",
              }}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div>
            <Button
              className="log-in-button"
              block
              type="submit"
              font-size="20px"
              style={{
                margin: "auto",
                color: "#efeb53",
                border: "#efeb53",
                backgroundColor: "#272724f3",
                width: "20%",
                fontSize: "1.4vw",
                height: "1%",
                marginTop: "5%",
              }}
            >
              Login
            </Button>
            <FacebookLogin
              className="facebook-Button"
              textButton="login with Facebook"
              data-layout="default"
              data-auto-logout-link="true"
              data-use-continue-as="true"
              data-width=""
              appId="1088597931155576"
              cookie={true}
              fields="name,email,picture"
              scope="public_profile,user_friends,user_actions.books"
              callback={this.responseFacebook}
              size="small"
            />
          </div>
          <p className="forgot-password">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    );
  }
}
