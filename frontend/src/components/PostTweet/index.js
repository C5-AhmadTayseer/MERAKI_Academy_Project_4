import React, { useContext, useState } from "react";
import axios from "axios";

import { isLoggedInContext } from "../../App";

const PostTweet = () => {
  const { setAllTweet, allTweet } = useContext(isLoggedInContext);
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const [tweetBody, setTweetBody] = useState("");

  const newTweet = () => {
    axios
      .post(
        `http://localhost:5000/tweets`,
        {
          tweetBody,
        },
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setAllTweet([result.data.tweet , ...allTweet])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        placeholder="What's happening ?"
        onChange={(e) => {
          setTweetBody(e.target.value);
        }}
      />
      <button onClick={newTweet}> Post </button>
    </div>
  );
};

export default PostTweet;
