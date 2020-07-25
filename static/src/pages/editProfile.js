import "./custom.css";
import { auth } from "../firebase/firebase";
import firebase from "firebase/app";
import React, { Component } from "react";

export default class EditProfile extends Component {
  state = { newPass: "", oldPass: "", newEmail: "" };

  onSubmit = () => {
    var credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      this.state.oldPass
    );

    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        console.log("Changings");
        this.state.newEmail
          ? auth.currentUser
              .updateEmail(this.state.newEmail)
              .then((res) => {
                alert("Email Changed");
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              })
          : console.log("No email specified");

        this.state.newPass
          ? auth.currentUser
              .updatePassword(this.state.newPass)
              .then((res) => {
                alert("Password Changed");
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              })
          : console.log("NO pass specified");
      })
      .catch((error) => {
        console.log(error.message, { ...this.state });
      });
  };
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    if (auth.currentUser)
      return (
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-2"></div>
            <div class="col-lg-6 col-md-8 login-box">
              <div class="col-lg-12 login-key">
                <i class="fa fa-key" aria-hidden="true"></i>
              </div>
              <div class="col-lg-12 login-title">UPDATE EMAIL/PASSWORD</div>

              <div class="col-lg-12 login-form">
                <div class="col-lg-12 login-form">
                  <div class="form-group">
                    <label class="form-control-label">Old Password</label>
                    <input
                      name="oldPass"
                      type="password"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">New Email</label>
                    <input
                      name="newEmail"
                      type="text"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">New Password</label>
                    <input
                      name="newPass"
                      type="password"
                      class="form-control"
                      onChange={this.onChange}
                    />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <button
                      onClick={this.onSubmit}
                      class="btn btn-outline-primary"
                    >
                      UPDATE
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-2"></div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="text-dark">YOU MUST BE LOGGED IN TO VIEW THIS PAGE</div>
      );
  }
}
