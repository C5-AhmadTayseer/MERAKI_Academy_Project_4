import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const addUser = () => {
    const newUser = { userName, password, email };
    console.log(newUser);
    axios
      .post("http://localhost:5000/register", newUser)
      .then((result) => {
        console.log(result, "Regiter Result");
      })
      .catch((err) => {
        console.log(err, "Register Error");
      });
  };

  return (
    <div>
      <div className="inputs">
        <input
          placeholder="userName"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={addUser}>Register</button>
      </div>
    </div>
  );
};

export default Register;
