import React, { Component } from "react";

class Formaccount extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          nameOfGuests: null,
          password: null,
          email: null
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }

      mySubmitHandler = (event) => {
        event.preventDefault();
        let password = this.state.password;
        if(this.state.password.length<8) {
          alert("Your password is too short");
        }
      }

      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
      }
    
      render() {
        return (
        
          <form onSubmit={this.mySubmitHandler}>
            <label>
              Name
              <br />
              <input
                name="nameOfGuests"
                type="text"
                value={this.state.nameOfGuests}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <br/>
            <label>
              Password
              <br/>
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <br/>
            <label>
              Email
            <br/>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <br/>
            <button>Submit</button>
          </form>
          );
      }
    }

export default Formlogin;
