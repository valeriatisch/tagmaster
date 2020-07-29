import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl, Container, Row, Col } from "react-bootstrap";
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
    <Container className="login-container">
      <Row>
        <Col></Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          {wrongCredentials ? <h1 className="login-text">Your Account is registered</h1> : <h1></h1>}
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
            <h3 className="login-text">Sign Up</h3>
            <FormGroup controlId="email" bsize="large">
              <div className="login-text">Email</div>
              <FormControl className="login-input"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsize="large">
              <div className="login-text">Password</div>
              <FormControl className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button className="login-btn" block bsize="large" disabled={!validateForm()} type="submit">
              Sign Up
            </Button>
          </form>
         </Col>
         <Col></Col>
      </Row>
    </Container>
  );
}
