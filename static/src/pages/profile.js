import React, { Component } from "react";

class Profile extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Profile</h2>
      </div>
    );
  }
}

export default Profile;
