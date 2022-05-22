import "./style.css";
import React, { useState , useContext } from "react";
import AllTweets from "../allTweets/";
import PostTweet from "../PostTweet/index";

import { isLoggedInContext } from "../../App";
const Home = () => {
  

  return (
    <div className="Main">
      {/*  */}
      <div className="Section-Header">
        <p>Home</p>
      </div>
      {/* <ModalpopUp /> */}
      <PostTweet />
      <AllTweets />
    </div>
  );
};

export default Home;
