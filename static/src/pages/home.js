import React, { Component } from "react";

import Header from "../components/homeheader";
import Body from "../components/homebody";

class Home extends Component {
  render() {
    return (
      <div>
        <style>
          {"body { background-color: #191919; color: #CBCBCB; position: relative; margin: 0; padding-bottom: 10rem; min-height: 100% } h1{color:#efeb53}"}
        </style>
        <Header/>
        <Body/>
      </div>
    );
  }
}
export default Home;
