// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import Routing from "./components/routing";
import AuthApi from "./components/AuthApi";
import Authentication, { getUserData } from "./components/authentication";
import CheckAuth from "./components/checkAuth.js";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const ReadSession = async () => {
    if (await CheckAuth()) {
      setAuth(true);
      setLoading(false);
    } else {
      setAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    ReadSession();
  }, []);

  const handleAuth = (token) => {
    setAuth(false);
  };

  return loading ? (
    <div></div>
  ) : (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <div>
          <Navbar auth={handleAuth} authToken={auth} />
          <Routing />
        </div>
      </Router>
    </AuthApi.Provider>
  );
}
