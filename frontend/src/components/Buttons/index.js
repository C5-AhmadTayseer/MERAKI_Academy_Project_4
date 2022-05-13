import React, { useState, useContext } from "react";
import axios from "axios";

import CreateComment from "../CreateComment/CreateCommet";
import { isLoggedInContext } from "../../App";

const Buttons = ({
  tweetId,
  tweetPublisher,
  signInUserId,
  isBookMarkTweet,
  bookMarkTweet,
  setBookMarkTweet,
  userBookMark,
  setUserBookMark,
  userNamePublisher,
  PublisherIdProfileImg,
  tweetContent,
  loggedInUserName,
  loggedInProfileImage,
}) => {
  // console.log(props);
  // console.log(bookMarkTweet);
  // console.log(userBookMark);
  const { allTweet, setAllTweet } = useContext(isLoggedInContext);
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
        console.log(result, "Update Tweet Result");
        console.log("TWEETS", allTweet);
        const mappedArr = allTweet.map((element) => {
          console.log(element);
          if (element._id === tweetId) {
            return result.data.tweet;
          }
          return element;
        });
        console.log("MAPPEDTWEETS-", [...mappedArr]);
        setAllTweet([...mappedArr]);
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
        const filterArray = allTweet.filter((element) => {
          {
            // return result.data.tweet;
            return element._id !== tweetId;
          }
        });
        console.log(filterArray, "FFFilter");
        // setAllTweet([...filterArray]);
        setAllTweet(filterArray);
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
    <div>
      {tweetPublisher === signInUserId ? (
        <div className="buttons">
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
        </div>
      ) : (
        ""
      )}
      <div>
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
        <div className="CreateComment">
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
      </div>
    </div>
  );
};

export default Buttons;
