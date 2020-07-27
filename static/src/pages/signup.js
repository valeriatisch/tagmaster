import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import { UserContext } from "../components/UserContext";
import {
  loginSession,
  getUserData,
  registerSession,
} from "../components/authentication";
import AuthApi from "../components/AuthApi";
import checkAuth from "../components/checkAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const authApi = React.useContext(AuthApi);
  const authStat = authApi.auth;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  return (
    <div className="Login" style={{ color: "white" }}>
      {wrongCredentials ? <h1>Your Account is registered</h1> : <h1></h1>}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const registerObj = {
            Email: email,
            first: "Max",
            last: "Mustermann",
            Password: password,
          };
          const loginObj = {
            Email: email,
            Password: password,
          };

          const register = await registerSession(registerObj);
          if (register.message === "ok") {
            setWrongCredentials(false);
            await loginSession(loginObj);
            authApi.setAuth(true);
          } else {
            setWrongCredentials(true);
          }
        }}
      >
        <h3>Sign Up</h3>

        <FormGroup controlId="email" bsize="large">
          Email
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsize="large">
          Password
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
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
        <Button block bsize="large" disabled={!validateForm()} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
