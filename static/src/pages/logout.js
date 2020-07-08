import React, { Component, Button } from "react";
import "./logout.css";
import Login from "../pages/login";

class Logout extends Component {
  componentDidMount() {
    sessionStorage.clear();
  }

  render() {
    return (
      <div style={{color:"white"}}>
        You have successfully logged out!
        <p>
          <a
            Header-link
            d-block
            d-lg-none
            mr-0
            mr-lg-3
            py-2
            py-lg-3
            border-top
            border-lg-top-0
            border-white-fade-15
            href="/login"
          >
            Login With another account?
          </a>
        </p>
      </div>
    );
  }
}
export default Logout;
