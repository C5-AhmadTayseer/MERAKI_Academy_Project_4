import "./style.css";
import React, { useState } from "react";
import axios from "axios";
import { BsTwitter } from "react-icons/bs";

const Register = ({ setIsOpen2 }) => {
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
        setIsOpen2(false)
      })
      .catch((err) => {
        console.log(err, "Register Error");
      });
  };

  return (
    <>
      <div className="overlay"></div>

      <div className="LoginModal">
        <div className="ModalIcon">
          <span className="T1">
            <BsTwitter />
          </span>
        </div>
        <div className="ModalHeader">
          <h2>Create You Account</h2>
        </div>
        <div className="ModalinputR">
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



        </div>

        <button className="signUpButton" onClick={addUser}>Sign Up</button>
        <span className="exit"> X </span>
      </div>
    </>
    // <div>
    //   <div className="inputs">
    // <input
    //   placeholder="userName"
    //   onChange={(e) => {
    //     setUserName(e.target.value);
    //   }}
    // />
        // <input
        //   placeholder="email"
        //   onChange={(e) => {
        //     setEmail(e.target.value);
        //   }}
        // />
        // <input
        //   placeholder="password"
        //   onChange={(e) => {
        //     setPassword(e.target.value);
        //   }}
        // />
    //     <button onClick={addUser}>Register</button>
    //     <button onClick={() => {
    //       setIsOpen2(false)
    //     }}>TEST</button>
    //   </div>
    // </div>
  );
};

export default Register;
