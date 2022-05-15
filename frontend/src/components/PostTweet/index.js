import "./style.css";
import React, { useContext, useState } from "react";
import axios from "axios";

import { isLoggedInContext } from "../../App";

const PostTweet = () => {
  const { setAllTweet, allTweet, loggedInProfileImage } =
    useContext(isLoggedInContext);
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
        setAllTweet([result.data.tweet, ...allTweet]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="newPost">
      <div className="profileImage">
        <img className="round-photo" src={`${loggedInProfileImage}`} />
      </div>

      <div className="input-btnContainer">
        <div className="newPost-input">
          <input
            placeholder="What's happening?"
            onChange={(e) => {
              setTweetBody(e.target.value);
            }}
          />
        </div>
        <div className="newPost-Btns">
          <div>
            <button>Test </button> <button>Test </button> <button>Test </button>
          </div>
          <div>
            <button className="POST" onClick={newTweet}> Tweet </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTweet;
