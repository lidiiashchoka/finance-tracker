import React from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Transactions />
      <Dashboard />
      <Profile />
      <Login />
    </>
  );
}

export default App;
