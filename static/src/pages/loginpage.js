import React, { Component } from "react";

import Formlogin from "../components/formlogin";
import Loginheader from "../components/loginheader";


class Login extends Component {
  render() {
    return (
      <div>
        <Loginheader/>
        <Formlogin/>
      </div>
    );
  }
}

export default Login;
