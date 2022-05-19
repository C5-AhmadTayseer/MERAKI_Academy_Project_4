import "./style.css";
import React, { useState } from "react";
import AllTweets from "../allTweets/";
import PostTweet from "../PostTweet/index";
import ModalpopUp from "../ModalTest";
const Home = () => {
  

  return (
    <div className="Main">
      {/*  */}
      <div className="Section-Header">
        <p>Home</p>
        <p>Icon</p>
      </div>
      {/* <ModalpopUp /> */}
      <PostTweet />
      <AllTweets />
    </div>
  );
};

export default Home;
