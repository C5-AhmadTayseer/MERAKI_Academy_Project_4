import React, { useState, useContext } from "react";
import axios from "axios";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";

import CreateComment from "../CreateComment/CreateCommet";
import { isLoggedInContext } from "../../App";
import AllTweets from "../allTweets";

const Buttons = ({
  tweetId,
  userNamePublisher,
  PublisherIdProfileImg,
  tweetContent,
  numberOfComment,
  numberOfLikes,
}) => {
  // console.log(props);
  // console.log(bookMarkTweet);
  // console.log(userBookMark);
  const {
    //
    allTweet,
    setAllTweet,
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
        if (allTweet) {
          const mappedArray = allTweet.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addLikeToTweet;
            }
            return element;
          });
          setAllTweet([...mappedArray]);
        }
        // console.log(mappedArray);

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
        if (allTweet) {
          const mappedArray = allTweet.map((element) => {
            if (element._id === tweetId) {
              return result.data.deleteLikeFromTweet;
            }
            return element;
          });
          setAllTweet([...mappedArray]);
        }
        console.log("UNLIKE Result", result);
        const filterArray = userLikes.filter((element) => {
          return element !== tweetId;
        });
        setUserLikes([...filterArray]);
        setSingleTweet(result.data.deleteLikeFromTweet);
      })

      .catch((err) => {
        console.log("UNLIKE Error", err);
      });
  };

  return (
    <div className="bottom-btns">
      <span
        onClick={() => {
          setIsInCommentMode(true);
        }}
      >
        <FaRegComment />
      </span>
      {isInCommentMode ? (
        <CreateComment
          userNamePublisher={userNamePublisher}
          PublisherIdProfileImg={PublisherIdProfileImg}
          tweetContent={tweetContent}
          loggedInUserName={loggedInUserName}
          loggedInProfileImage={loggedInProfileImage}
          tweetId={tweetId}
          setIsInCommentMode={setIsInCommentMode}
        />
      ) : (
        ""
      )}
      <span>
        <AiOutlineRetweet />
      </span>

      {userLikes.includes(tweetId) ? (
        <span
          onClick={() => {
            unLikeTweet(tweetId);
          }}
        >
          {numberOfLikes ? numberOfLikes : ""} UnLike
        </span>
      ) : (
        <span
          onClick={() => {
            likeTweet(tweetId);
          }}
        >
          {numberOfLikes ? numberOfLikes : ""} <BsHeart />
        </span>
      )}
    </div>
  );
};

export default Buttons;
