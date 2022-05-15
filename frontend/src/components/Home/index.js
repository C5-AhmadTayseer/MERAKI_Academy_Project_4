import "./style.css";
import React from "react";
import AllTweets from "../allTweets/";
import PostTweet from "../PostTweet/index"

const Home = () => {
  return (
    <div className="Main">
      <div className="Section-Header">
      <p>Home</p>
      <p>Icon</p>
      </div>
      <PostTweet />
      <AllTweets />
    </div>
  );
};

export default Home;
