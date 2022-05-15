import React, { useState, useContext } from "react";
import axios from "axios";

import CreateComment from "../CreateComment/CreateCommet";
import { isLoggedInContext } from "../../App";

const Buttons = ({
  tweetId,
  tweetPublisher,
  isBookMarkTweet,
  bookMarkTweet,
  setBookMarkTweet,
  userNamePublisher,
  PublisherIdProfileImg,
  tweetContent,
  loggedInUserName,
  loggedInProfileImage,
  isDeleteinProfile,
}) => {
  // console.log(props);
  // console.log(bookMarkTweet);
  // console.log(userBookMark);
  const {
    allTweet,
    setAllTweet,
    setProfileTweets,
    profilTweets,
    signInUserId,
    userBookMark,
    setUserBookMark,
    singleTweet,
    setSingleTweet,
  } = useContext(isLoggedInContext);
  const [isAddedToBookMark, setIsAddedToBookMark] = useState(false);
  const [tweetBody, setTweetBody] = useState("");
  // temp state will remove it
  const [isInCommentMode, setIsInCommentMode] = useState(false);

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  //(function , TOKEN) >>
  // onClick setState ?  <

  const updateTweet = (tweetId) => {
    axios
      .put(
        `http://localhost:5000/tweets/${tweetId}`,
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
        console.log(profilTweets, "SSSSSSS");
        console.log(result, "Update Tweet Result ==== ");
        console.log("TWEETS", allTweet);
        //for update in home page
        if (allTweet) {
          const mappedArr = allTweet.map((element) => {
            console.log(element);
            if (element._id === tweetId) {
              return result.data.tweet;
            }

            return element;
          });
          setAllTweet([...mappedArr]);
          console.log("MAPPEDTWEETS-", [...mappedArr]);
        }
        //for update in profile
        if (profilTweets) {
          const mappedArr = profilTweets.map((element) => {
            console.log(element);
            if (element._id === tweetId) {
              return result.data.tweet;
            }

            return element;
          });
          setProfileTweets([...mappedArr]);
        }

        //for update in oneTweet
        setSingleTweet(result.data.tweet);

        // Here ,
        // getAllTweets();
      })
      .catch((err) => {
        console.log(err, "err in update Tweet");
      });
  };

  const deleteTweet = (tweetId) => {
    axios
      .delete(`http://localhost:5000/tweets/${tweetId}`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        if (allTweet) {
          const filterArray = allTweet.filter((element) => {
            // return result.data.tweet;
            return element._id !== tweetId;
          });
          setAllTweet(filterArray);
          console.log(filterArray, "FFFilter");
          console.log("aaaaaaaaa", profilTweets);
        }
        if (profilTweets) {
          console.log(profilTweets, "AFTER FILTER PROFILE ..");
          const filterArrayForProfile = profilTweets.filter((element) => {
            return element._id !== tweetId;
          });
          setProfileTweets(filterArrayForProfile);
        }
        setSingleTweet("");
        console.log(isDeleteinProfile, "====");
        console.log(singleTweet._id, "INSIDE DELETE");

        // setAllTweet([...filterArray]);
      });
  };

  const addToBookMark = (tweetId) => {
    console.log(tweetId, "=== inside add ===");
    console.log("BM TOKEN: ", TOKEN);
    axios
      .post(
        `http://localhost:5000/bookMark/${tweetId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log("bookMark Result", result);
        setIsAddedToBookMark(true);
      })
      .catch((err) => {
        console.log("BookMark Error", err);
      });
  };

  const removeFromBookMark = (tweetId) => {
    axios
      .delete(`http://localhost:5000/bookmark/${tweetId}`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        console.log("Remove == bookMark Rwsult", result);
        // console.log(bookMarkTweet, "Before Filter");
        console.log(bookMarkTweet);
        if (bookMarkTweet) {
          const filterBookMark = bookMarkTweet.filter((element) => {
            return tweetId !== element._id;
          });
          setBookMarkTweet(filterBookMark);
          setUserBookMark(filterBookMark);
        }
        setIsAddedToBookMark(false);

        // console.log(filterBookMark, "AFTER FILTER");
      })
      .catch((err) => {
        console.log("Remove == BookMark Error", err);
      });
  };

  return (
    <div className="tweetbtn">
      {tweetPublisher === signInUserId ? (
        <>
          <input
            placeholder="Update"
            onChange={(e) => {
              setTweetBody(e.target.value);
            }}
          />
          <button
            onClick={() => {
              updateTweet(tweetId);
            }}
          >
            update
          </button>
          <button
            onClick={() => {
              deleteTweet(tweetId);
            }}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}

      {/* BookMark and >>createComment<<sperated component    */}

      {/* Add || to check if it's om bookmark ..(it's not working on twitter , after refresh still (BookMark) => but on click message said it's already in book mark , (can handle it ..))  */}
      {/* {isAddedToBookMark  ? ( */}
      {isAddedToBookMark ||
      isBookMarkTweet ||
      userBookMark.includes(tweetId) ? (
        <button
          onClick={(e) => {
            removeFromBookMark(tweetId);
          }}
        >
          Remve Frombook mark
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.target = tweetId;
            console.log(e.target, "EE");
            console.log(tweetId, "Add =====");
            addToBookMark(tweetId);
          }}
        >
          add To book mark
        </button>
      )}
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
    </div>
  );
};

export default Buttons;
