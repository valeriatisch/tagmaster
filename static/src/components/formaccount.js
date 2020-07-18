import React, { Component } from "react";
import "./formaccountdesign.css";
import { Link } from 'react-router-dom';
import { Navbar, ThemeProvider } from "react-bootstrap";


class Formlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      errorpassword: null,
      errortruepassword: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    if(this.state.email==null||this.state.email==""){
      alert("email must not be empty");
    }
    else if(this.state.errortruepassword){
      alert(this.state.errorpassword);
    }
    else if(this.state.password==null||this.state.password==""){
      alert("password must not be empty");
    }
    else if(this.state.email==null||this.state.email==""){
      alert("email must not be empty");
    }
    else{
      alert("Successfull!!");
    }
    
    
  };

  handleInputChange(event) {
    const { name, value } = event.target;
    switch (name) {
      
      case "password":
        this.state.password = value;
        if(value.length<8&&value.length>0){
          document.getElementById("spanmessagepassword").innerHTML = 'minimum 8 characaters required'
          this.state.errorpassword = "minimum 8 characaters required for password"
            this.state.errortruepassword = true
        }
        else if(value.length==0){
          document.getElementById("spanmessagepassword").innerHTML = 'password must not be empty'
          this.state.errorpassword= "password must not be empty"
          this.state.errortruepassword = true
        }

        else{
          document.getElementById("spanmessagepassword").innerHTML = ''
          this.state.errorpassword = ""
            this.state.errortruepassword = false
        }
        break;
        case "email":
        this.state.email = value;
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div
        class="container "
        style={{
          marginTop: "50px",
          border: "2px solid",
          padding: "30px",
          borderRadius: "30px",
          width:"420px"
        }}
        
      >
        <style>
          {
            ".button1{ margin-top:20px; width:150px; height: 30px;  color:#f5f8fa; background-color:#4fbae6; border: 1px solid #4fbae6; border-radius: 30px; } .button1:hover { background-color:#5b9be5; color:#f5f8fa; border: 1px solid } .input1{width:300px; height:30px;border-radius: 15px; border: 1px solid; border-color:#000000; padding:7px} .input1:focus{outline:none}"
          }
        </style>
        <h1 style={{ fontSize: "30px", marginTop: "5px", padding: "40px" }}>
          Create an Account
        </h1>
        <form onSubmit={this.mySubmitHandler}>
          
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
          <label>
            Password
            <br />
            <input
              class="input1"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
       
          <span className="errorMessage" id="spanmessagepassword"></span>
          
          <br />
          <br />
          <br />
         
          <button>
            CREATE ACCOUNT
          </button>
          
        </form>
      </div>
    );
  }
  
}



export default Formlogin;