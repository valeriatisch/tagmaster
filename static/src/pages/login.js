import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl, Container, Row, Col } from "react-bootstrap";
import "./login.css";
import { UserContext } from "../components/UserContext";
import { loginSession, getUserData } from "../components/authentication";
import { Link } from "react-router-dom";
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
          {wrongCredentials ? (
            <h1 className="login-text">Error! Email address or password is incorrect</h1>
          ) : (
            <h1></h1>
          )}

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const obj = {
                Email: email,
                Password: password,
              };

              const login = await loginSession(obj);
              if (login.message === "ok") {
                setWrongCredentials(false);
                authApi.setAuth(true);
              } else {
                setWrongCredentials(true);
              }
            }}
          >
            <h3 className="login-text">Sign In</h3>
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
              Login
            </Button>
            <Link to={"/signup"}>
              <p className="forgot-password text-right login-text">No account?</p>
            </Link>
          </form>
         </Col>
         <Col></Col>
      </Row>
    </Container>

  );
}
