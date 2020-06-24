import React, { Component } from "react";
import { Button, FormGroup } from "react-bootstrap";
import "./login.css";
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
  }

  render() {
    return (
      <div className="Login" style={{ color: "white" }}>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <FormGroup controlId="email" bsSize="large">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>

          <Button type="submit" block bsSize="large" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
