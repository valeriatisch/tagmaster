import React, { Component } from "react";
import logo from "../ressources/tagmastericon.png"

class Header extends Component{
    
    render(){
        return(
        <header style={{color:"#efeb53",backgroundColor:"#191919"}}>
          <div class="container text-center">
            <h1 style={{fontSize:"70px"}}>Welcome to</h1>
            <img src={logo} alt="Tagmastericon" style={{height:"450px",marginTop:"10px"}}></img>
            <h1 style={{fontSize:"40px"}}>What is it?</h1>
            <p style={{fontSize:"20px"}}>Tagmaster is an app for labelling pictures most commonly used for training Image Recognition AIs. </p>
          </div>
        </header>
        )
    }
}

export default Header;