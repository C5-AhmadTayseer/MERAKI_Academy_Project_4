import React, { useState, useContext } from "react";
import axios from "axios";
import { isLoggedInContext } from "../../App";

const CreateComment = ({
  userNamePublisher,
  PublisherIdProfileImg,
  tweetContent,
  loggedInUserName,
  tweetId,
  loggedInProfileImage,
}) => {
  const {
    allTweet,
    setAllTweet,
    setSingleTweet,
    setProfileTweets,
    profilTweets,
  } = useContext(isLoggedInContext);

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const [comment, setComment] = useState("");

  const newComment = (tweetId) => {
    axios
      .post(
        `http://localhost:5000/tweets/${tweetId}/comments`,
        {
          comment,
        },
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log(result, "COMMENT RESULT ");
        console.log(profilTweets, "PROFILE TWEET IN COMMENT");
        const mappedArr = allTweet.map((element) => {
          // console.log(element);
          if (element._id === tweetId) {
            return result.data;
          }
          return element;
        });
        setAllTweet([...mappedArr]);
        setSingleTweet(result.data);
        console.log(result, "CREATE COMMENT");

        const inProfileMap = profilTweets.map((element) => {
          if (element._id === tweetId) {
            return result.data;
          }
          return element;
        });
        setProfileTweets([...inProfileMap]);
      })
      //For Comment in profile section

      .catch((err) => {
        console.log(err, "err in update Tweet");
      });
  };

  return (
    <div>
      <div>
        {/* for username and photo */}
        <div className="test1">
          <img src={`${PublisherIdProfileImg}`} />
          <p>{userNamePublisher}</p>
        </div>
        {/* tweet body */}
        <div>
          <p>TweetBody ,, {tweetContent}</p>
        </div>
        <p>replying to {userNamePublisher}</p>

        <div className="test1">
          <img src={`${loggedInProfileImage}`} />
          <input
            placeholder="Tweet Your reply"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <button
            onClick={() => {
              newComment(tweetId);
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
