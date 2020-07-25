import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import FacebookLogin from "react-facebook-login";
import { auth } from "../firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        alert("LOGIN SUCCESFULL");
        console.log(res);
      })
      .catch((err) => alert(err.message));
  }
  console.log("USER : ", window.user);
  return (
    <div className="Login" style={{ color: "white" }}>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <FormGroup controlId="email" bsSize="large">
          Email
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
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
        <Button
          block
          disabled={!validateForm()}
          className="log-in-button"
          block
          type="submit"
          font-size="20px"
          style={{
            margin: "auto",
            color: "#efeb53",
            backgroundColor: "#272724f3",
            width: "20%",
            fontSize: "1.4vw",
            height: "1%",
            marginTop: "5%",
          }}
          type="submit"
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
          size="small"
        />

        <a
          href="#"
          onClick={() => {
            email
              ? auth
                  .sendPasswordResetEmail(email)
                  .then((res) => {
                    alert("Verification Link has been Sent To Your Email");
                    console.log(res);
                  })
                  .catch((err) => {
                    alert(err.message);
                    console.log(err);
                  })
              : alert("Please Enter Your Email Then Click Forgot password");
          }}
          className="text-dark"
        >
          Forgot password?
        </a>
      </form>
    </div>
  );
}
