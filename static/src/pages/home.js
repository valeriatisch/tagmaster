import React, { Component } from "react";
import Header from "../components/homeheader";
import Body from "../components/homebody";

class Home extends Component {
  render() {
    return (
      <div style={{color:"#efeb53",backgroundColor:"#191919",marginTop:"10px"}}>
        <style>{'body { background-color: #191919; }'}</style>
        <Header/>
        <Body/>
      </div>
    );
  }
}

export default Home;