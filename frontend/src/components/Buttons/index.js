import React, { useState, useContext } from "react";
import axios from "axios";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";

import CreateComment from "../CreateComment/CreateCommet";
import { isLoggedInContext } from "../../App";

const Buttons = ({
  tweetId,
  userNamePublisher,
  PublisherIdProfileImg,
  tweetContent,
}) => {
  // console.log(props);
  // console.log(bookMarkTweet);
  // console.log(userBookMark);
  const {
    //
    loggedInUserName,
    loggedInProfileImage,
    //
    singleTweet,
    setSingleTweet,
    //For Like Button .
    userLikes,
    setUserLikes,
  } = useContext(isLoggedInContext);
  // temp state will remove it
  const [isInCommentMode, setIsInCommentMode] = useState(false);

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  //(function , TOKEN) >>
  // onClick setState ?  <

  const likeTweet = (tweetId) => {
    axios
      .post(
        `http://localhost:5000/likes/${tweetId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log("LIKE Result", result);
        setUserLikes([...userLikes, tweetId]);
        //will throw an error (populate .)
        setSingleTweet(result.data.addLikeToTweet);
      })
      .catch((err) => {
        console.log("LIKE Error", err);
      });
  };

  const unLikeTweet = (tweetId) => {
    axios
      .delete(`http://localhost:5000/likes/${tweetId}`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        console.log("UNLIKE Result", result);
        const filterArray = userLikes.filter((element) => {
          return element !== tweetId;
        });
        setUserLikes([...filterArray]);
        setSingleTweet(result.data.deleteLikeFromTweet)
      })
     
      .catch((err) => {
        console.log("UNLIKE Error", err);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsInCommentMode(!isInCommentMode);
        }}
      >
        create Comment
      </button>
      {isInCommentMode ? (
        <CreateComment
          userNamePublisher={userNamePublisher}
          PublisherIdProfileImg={PublisherIdProfileImg}
          tweetContent={tweetContent}
          loggedInUserName={loggedInUserName}
          loggedInProfileImage={loggedInProfileImage}
          tweetId={tweetId}
        />
      ) : (
        ""
      )}
      {userLikes.includes(tweetId) ? (
        <button
          onClick={() => {
            unLikeTweet(tweetId);
          }}
        >
          UnLike
        </button>
      ) : (
        <span
          onClick={() => {
            likeTweet(tweetId);
          }}
        >
          <BsHeart />
        </span>
      )}
    </div>
  );
};

export default Buttons;
