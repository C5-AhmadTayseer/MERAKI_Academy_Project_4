import React from "react";
import "./App.css";
import Register from "./components/Register";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
      {/* Links just for testeing */}

      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/home">home</Link>
      {/* side Bar , to be fixed before routes?  */}

      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
