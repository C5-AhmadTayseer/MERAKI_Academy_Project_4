import "./style.css";
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
  setIsInCommentMode,
}) => {
  const {
    //forBookMark
    bookMarkTweet,
    setBookMarkTweet,
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
        // an error when creating comment in single tweet , when refresh the page because map array .
        if (allTweet) {
          const mappedArr = allTweet.map((element) => {
            // console.log(element);
            if (element._id === tweetId) {
              return result.data;
            }
            return element;
          });
          setAllTweet([...mappedArr]);
        }
        setSingleTweet(result.data);
        console.log(result, "CREATE COMMENT");

        if (profilTweets) {
          const inProfileMap = profilTweets.map((element) => {
            if (element._id === tweetId) {
              return result.data;
            }
            return element;
          });
          setProfileTweets([...inProfileMap]);
        }
        if (bookMarkTweet) {
          const mappedBookMark = bookMarkTweet.map((element) => {
            if (element._id === tweetId) {
              return result.data;
            }
            return element;
          });
          setBookMarkTweet([...mappedBookMark]);
        }
      })
      //For Comment in profile section

      .catch((err) => {
        console.log(err, "err in update Tweet");
      });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal-reply">
        {/* for username and photo */}
        {/* two div ,  */}

        <div className="popUpContainer">
          <div className="upperSection">
            <div className="publisherPhoto">
              <img src={`${PublisherIdProfileImg}`} />
            </div>

            <div className="userNameAndtweetBody">
              <div className="userName">
                <p>{userNamePublisher}</p>
              </div>
              <div className="tweetBody">
                <p>TweetBody ,, {tweetContent}</p>
              </div>
            </div>
          </div>
          {/* for Replying to ,, Middle */}
          <div className="middle">
            <p>replying to {userNamePublisher}</p>
          </div>
          {/* lower-Section for commenter photo and input field  (container - devided to 2 div) */}
          <div className="lowerSection">
            <div className="lowerSection-image">
              <img src={`${loggedInProfileImage}`} />
            </div>

            <div className="lowerSection-input">
              <input
                placeholder="Tweet Your reply"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setIsInCommentMode(false);
              newComment(tweetId);
            }}
          >
            Reply
          </button>
          <button
            onClick={() => {
              setIsInCommentMode(false);
            }}
          >
            X
          </button>
        </div>

        {/* tweet body */}
      </div>
    </>
  );
};

export default CreateComment;
