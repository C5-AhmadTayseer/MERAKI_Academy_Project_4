import "./style.css";
import React from "react";
import AllTweets from "../allTweets/";
import PostTweet from "../PostTweet/index"

const Home = () => {
  return (
    <div>
      <PostTweet />
      <h2>Home Page</h2>
      <AllTweets />
    </div>
  );
};

export default Home;
