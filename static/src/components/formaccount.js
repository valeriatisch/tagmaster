import React, { Component } from 'react';
import './formaccountdesign.css';
import { auth } from '../firebase/firebase';

class Formlogin extends Component {
  state = {
    password: null,
    email: null,
  };

  onSubmit = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        alert('Successfully created your account kidnly login now');
        console.log(res);
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        class='container '
        style={{
          marginTop: '50px',
          border: '2px solid',
          padding: '30px',
          borderRadius: '30px',
          width: '420px',
        }}>
        <style>
          {
            '.button1{ margin-top:20px; width:150px; height: 30px;  color:#f5f8fa; background-color:#4fbae6; border: 1px solid #4fbae6; border-radius: 30px; } .button1:hover { background-color:#5b9be5; color:#f5f8fa; border: 1px solid } .input1{width:300px; height:30px;border-radius: 15px; border: 1px solid; border-color:#000000; padding:7px} .input1:focus{outline:none}'
          }
        </style>
        <h1 style={{ fontSize: '30px', marginTop: '5px', padding: '40px' }}>
          Create an Account
        </h1>
        <form>
          <label>
            Email
            <br />
            <input
              class='input1'
              name='email'
              type='email'
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
              class='input1'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>

          <span className='errorMessage' id='spanmessagepassword'></span>

          <br />
          <br />
          <br />

          <button onClick={this.onSubmit}>CREATE ACCOUNT</button>
        </form>
      </div>
    );
  }
}

export default Formlogin;
