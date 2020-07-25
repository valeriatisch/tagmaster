// App.js
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';

class App extends Component {
  componentDidMount() {
    console.log('gg', window.user);
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
        </div>
      </Router>
    );
  }
}

export default App;
