import React, { useState, useContext } from "react";
import axios from "axios";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";

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
  const [isAddedToBookMark, setIsAddedToBookMark] = useState(false);
  const [tweetBody, setTweetBody] = useState("");
  // temp state will remove it
  const [isInCommentMode, setIsInCommentMode] = useState(false);

  const [isOpen, setIsOpen] = useState(false); // << for the 3 dot icon

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
        // setSingleTweet(result.data.addLikeToTweet);
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
      })
      .catch((err) => {
        console.log("UNLIKE Error", err);
      });
  };

  return (
    <div className="tweetbtn">
      <BiDotsHorizontalRounded
        className="dropDown"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {/* isOpen? className="list-hide" : className ="show" */}
      {/* update and delete */}
      <div className={isOpen ? "list-show" : "list-hide"}>
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

        {isAddedToBookMark ||
        isBookMarkTweet ||
        userBookMark.includes(tweetId) ? (
          <button
            onClick={(e) => {
              // setIsOpen(false);
              removeFromBookMark(tweetId);
            }}
          >
            Remve Frombook mark
          </button>
        ) : (
          <button
            onClick={(e) => {
              // setIsOpen(false);
              e.target = tweetId;
              console.log(e.target, "EE");
              console.log(tweetId, "Add =====");
              addToBookMark(tweetId);
            }}
          >
            add To book mark
          </button>
        )}
      </div>

      {/* BookMark and >>createComment<<sperated component    */}

      {/* Add || to check if it's om bookmark ..(it's not working on twitter , after refresh still (BookMark) => but on click message said it's already in book mark , (can handle it ..))  */}
      {/* {isAddedToBookMark  ? ( */}

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
