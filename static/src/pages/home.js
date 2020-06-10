import React, { Component } from "react";
import Header from "../components/homeheader";
import Body from "../components/homebody";

class Home extends Component {
  render() {
    return (
      <div>
        <style>
          {"body { background-color: #191919; color: #CBCBCB; marginTop:10px} h1{color:#efeb53}"}
        </style>
        <Header/>
        <Body/>
      </div>
    );
  }
}

export default Home;