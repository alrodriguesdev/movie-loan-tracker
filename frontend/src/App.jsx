import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { LoanProvider } from "./components/LoanContext";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    axios
      .post("/logout")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });

    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  // Function to check authentication based on session
  const checkSession = async () => {
    try {
      const response = await axios.get("/checksession");
      if (response.data.authenticated) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  // Run the check when the component mounts
  useEffect(() => {
    checkSession();
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <LoanProvider>
          <FrontPage onLogout={logout} />
        </LoanProvider>
      </>
    );
  } else {
    return (
      <>
        <Login setIsAuthenticated={setIsAuthenticated} />
        <Register setIsAuthenticated={setIsAuthenticated} />
      </>
    );
  }
}

export default App;
