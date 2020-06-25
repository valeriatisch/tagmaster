// App.js
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
