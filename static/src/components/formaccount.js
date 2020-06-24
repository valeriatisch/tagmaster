import React, { Component } from "react";

class Formlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    let password = this.state.password;
    /*  if (this.state.password.length < 8) {
      alert("Your password is too short");
    } */
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
  }

  render() {
    return (
      <div
        class="container "
        style={{
          marginTop: "10px",
          border: "1px solid",
          padding: "30px",
          borderRadius: "30px",
        }}
      >
        <style>
          {
            ".button1{ margin-top:20px; width:150px; height: 30px;  color:#f5f8fa; background-color:#4fbae6; border: 1px solid #4fbae6; border-radius: 30px; } .button1:hover { background-color:#5b9be5; color:#f5f8fa; border: 1px solid } .input1{width:250px; height:20px;border-radius: 15px; border: 1px solid; border-color:#000000; padding:7px} .input1:focus{outline:none}"
          }
        </style>
        <h1 style={{ fontSize: "22px", marginTop: "5px", padding: "40px" }}>
          Create an Account
        </h1>
        <form onSubmit={this.mySubmitHandler}>
          <label>
            Name
            <br />
            <input
              class="input1"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Password
            <br />
            <input
              class="input1"
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Email
            <br />
            <input
              class="input1"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <button>
            type="submit" class="btn btn-lg button1" role="button"
            aria-pressed="true">Register
          </button>
        </form>
      </div>
    );
  }
}

export default Formlogin;
