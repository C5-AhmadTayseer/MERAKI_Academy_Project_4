import "./style.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AllTweets from "../allTweets/";
// import { isLoggedInContext } from "../../App";

const Home = () => {
  // const { token } = useContext(isLoggedInContext);
  // console.log(token , " Token in HomePage");
  //   const TOKEN = token;
  //<< it's give me fail (on render) when used it in this way , so i will take the token directly from the local Storage .

  //for update
  // const [tweetBody, setTweetBody] = useState("");
  // const updateTweet = (tweetId) => {
  //   axios
  //     .put(
  //       `http://localhost:5000/tweets/${tweetId}`,
  //       {
  //         tweetBody,
  //       },
  //       {
  //         headers: {
  //           authorization: "Bearer " + TOKEN,
  //         },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result, "Update Tweet Result");
  //       getAllTweets();
  //     })
  //     .catch((err) => {
  //       console.log(err, "err in update Tweet");
  //     });
  // };

  return (
    <div>
      <h2>Home Page</h2>
      {/* classname just for test */}
      <AllTweets />
    </div>
  );
};

export default Home;
