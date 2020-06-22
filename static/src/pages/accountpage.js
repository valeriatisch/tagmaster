import React, { Component } from "react";

import Formaccount from "../components/formaccount";
import Accountheader from "../components/accountheader";


class Register extends Component {
  render() {
    return (
      <div>
        <Loginheader/>
        <Formlogin/>
      </div>
    );
  }
}

export default Register;
