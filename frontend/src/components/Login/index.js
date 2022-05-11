import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { isLoggedInContext } from "../../App";

const Login = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn, token } = useContext(isLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const signIn = () => {
    const user = { email, password };

    axios
      .post("http://localhost:5000/login", user)
      .then((result) => {
        // console.log(result);
        console.log(result.data.token, "Sign In");
        setIsLoggedIn(true);
        localStorage.setItem("token", JSON.stringify(result.data.token));
        // navigate("/home")  << will use it when make home component 
      })
      .catch((err) => {
        console.log(err, "Sign In Error");
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      {/* <h2>Test Token from useEffect in App {token}</h2> */}
      <div className="input">
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
        <button onClick={signIn}>Log in</button>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
