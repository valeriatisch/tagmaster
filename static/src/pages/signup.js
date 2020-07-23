import React, { useState, useContext } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import { UserContext } from "../components/UserContext";
import { loginSession, getUserData } from "../components/authentication";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="Login" style={{ color: "white" }}>
      {null ? (
        <pre>{JSON.stringify(null, null, 2)}</pre>
      ) : (
        <h1>User not logged in</h1>
      )}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const obj = {
            Email: email,
            Password: password,
          };

          loginSession(obj);
          const session = await getUserData();
        }}
      >
        <h3>Sign In</h3>

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
          </div>
        </div>
        <Button block bsize="large" disabled={!validateForm()} type="submit">
          Create Account
        </Button>
      </form>
    </div>
  );
}
