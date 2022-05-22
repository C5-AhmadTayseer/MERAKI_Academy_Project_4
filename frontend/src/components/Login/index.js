import "./style.css"
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import Register from "../Register";

import axios from "axios";

import { isLoggedInContext } from "../../App";

const Login = () => {
  const navigate = useNavigate()
  const [isOpen , setIsOpen] = useState(false)
  const [isOpen2 , setIsOpen2] = useState(false)
  const { setIsLoggedIn, token } = useContext(isLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const signIn = () => {
    const user = { email, password };

    axios
      .post("http://localhost:5000/login", user)
      .then((result) => {
        console.log(result);
        console.log(result.data.token, "Sign In");
        setIsLoggedIn(true);
        localStorage.setItem("token", JSON.stringify(result.data.token));
        navigate("/home")  
      })
      .catch((err) => {
        console.log(err, "Sign In Error");
        setMessage(err.response.data.message);
      });
  };
  return (
    <div className="Register-Login">
      
      <div className="LeftContainer">
        <span className="TwitterIcon"> <BsTwitter /></span>
      </div>


    <div className="RightContainer">
    <div className="RIGHTICON">
    <span className="TwitterIcon2"> <BsTwitter /></span>

    </div>

    <div className="LoginHeader">
      <h2>Happening now</h2>
      </div> 
  
  <div className="LoginHeader">
    <h3>Join Twitter Today.</h3>
  </div>

<div className="LoginBtns">

<button className="Btns" onClick={() => { 
  setIsOpen2(true)
}}>
Sign up

</button>
<button className="Btns" onClick={() => { 
  setIsOpen(true)
}}>
Sign in

</button>
</div>
{isOpen ? <>
<div className="overlay"></div>

<div className="LoginModal">

<div className="ModalIcon">
<span className="T1"><BsTwitter /></span>
</div>
<div className="ModalHeader">
<h2>Sign in to Twitter</h2>
</div>
<div className="Modalinput">
<input
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
</div>

<button className="SignInBtn" onClick={signIn}>Sign in</button>
</div>


</> : ""}

    </div>



{isOpen2 ? <Register setIsOpen2={setIsOpen2} /> : ""}


      {/* <h2>Test Token from useEffect in App {token}</h2>
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
      </div> */}
    </div>
  );
};

export default Login;
