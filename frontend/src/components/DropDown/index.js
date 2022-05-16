import React, { useState, useContext } from "react";
import axios from "axios";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { isLoggedInContext } from "../../App";

const DropDown = ({
  tweetId,
  PublisherId,
  isBookMarkTweet,
  bookMarkTweet,
  setBookMarkTweet,
  isDeleteinProfile,
}) => {
  const {
    allTweet,
    setAllTweet,
    setProfileTweets,
    profilTweets,
    signInUserId,
    userBookMark,
    setUserBookMark,
    //
    singleTweet,
    setSingleTweet,
    //follow
    profileFollower,
    setProfileFollower,
    userFollower,
    setUserFollower,
  } = useContext(isLoggedInContext);
  const [isAddedToBookMark, setIsAddedToBookMark] = useState(false);
  const [tweetBody, setTweetBody] = useState("");
  // temp state will remove it
  const [isOpen, setIsOpen] = useState(false); // << for the 3 dot icon

  const TOKEN = JSON.parse(localStorage.getItem("token"));

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

  //Follow
  const follow = (PublisherId) => {
    // console.log(PublisherId, userFollower);

    axios
      .post(
        `http://localhost:5000/users/${PublisherId}/follow`,
        {},
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log("Follow ===", result);
        console.log(userFollower, "UU====UU");
        console.log(PublisherId, "PUBLISHER ID INSIDE FOLLOW");
        if (profileFollower) {
          console.log(profileFollower, signInUserId, "@@@@");
          setProfileFollower([signInUserId, ...profileFollower]);
        }
        setUserFollower([PublisherId, ...userFollower]);
      })
      .catch((err) => {
        console.log(err, "FollowError");
      });
  };

  const unFollow = (PublisherId) => {
    console.log(PublisherId, userFollower);
    axios
      .delete(`http://localhost:5000/users/${PublisherId}/follow`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        console.log(result, "unFollow======");
        const filterArray = userFollower.filter((element) => {
          console.log(element, "INSIDE UNFOLLOW");
          return element !== PublisherId;
        });
        //condition to not have error when add to follow in home page ..
        if (profileFollower) {
          const filterForProfile = profileFollower.filter((element) => {
            if (element._id) {
              return element._id !== signInUserId;
            }
            if (element) {
              return element !== signInUserId;
            }
          });
          setProfileFollower(filterForProfile);
        }
        setUserFollower(filterArray);
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
        {PublisherId === signInUserId ? (
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
      {/* Follow */}
      {PublisherId === signInUserId ? (
        ""
      ) : (
        <div>
          {userFollower.includes(PublisherId) ? (
            <button
              onClick={() => {
                unFollow(PublisherId);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              className="follow"
              onClick={() => {
                follow(PublisherId);
              }}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;

//Function Follow ,  << BookMark , Follow , delete , update >>
//
//<<bottom >> Like , Re-tweet - reply .
