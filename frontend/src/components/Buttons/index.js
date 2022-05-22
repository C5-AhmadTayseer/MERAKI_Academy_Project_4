import "./style.css";
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
  numberOfRetweet,
}) => {
  // console.log(props);
  // console.log(bookMarkTweet);
  // console.log(userBookMark);
  const {
    signInUserId,
    //bookmarkPage , to update number of likes ,
    setBookMarkTweet,
    bookMarkTweet,
    //
    profilTweets,
    setProfileTweets,
    //
    LIKEDTWEET,
    setLIKEDTWEET,
    RETWEET,
    setRETWEET,
    //
    allTweet,
    setAllTweet,
    loggedInUserName,
    loggedInProfileImage,
    // RETWEET ,
    // setRETWEET
    //
    singleTweet,
    setSingleTweet,
    //==
    //For Like Button .
    userLikes,
    setUserLikes,
    //Retweet Button
    userRetweets,
    setUserRetweets,
    //==
    ///
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
        ///
        if (RETWEET) {
          const mapRETWEET = RETWEET.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addLikeToTweet;
            }
            return element;
          });
          setRETWEET([...mapRETWEET]);
        }
        // console.log(mappedArray);
        ///forBookMarkPage ,
        if (bookMarkTweet) {
          const mappedBookMark = bookMarkTweet.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addLikeToTweet;
            }
            return element;
          });
          setBookMarkTweet([...mappedBookMark]);
        }

        ///==
        setUserLikes([...userLikes, tweetId]);

        ///==

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
        ///
        if (RETWEET) {
          const mapRETWEET = RETWEET.map((element) => {
            if (element._id === tweetId) {
              return result.data.deleteLikeFromTweet;
            }
            return element;
          });
          setRETWEET([...mapRETWEET]);
        }

        ///BookMark
        if (bookMarkTweet) {
          const mappedBookMark = bookMarkTweet.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.deleteLikeFromTweet;
            }
            return element;
          });
          setBookMarkTweet([...mappedBookMark]);
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

  ////////Retweet
  const reTweetAdd = (tweetId) => {
    axios
      .post(
        `http://localhost:5000/retweet/${tweetId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log("ADD TO RETWEET Result", result);
        console.log(userRetweets, "===================");
        if (allTweet) {
          const mappedArray = allTweet.map((element) => {
            console.log(element, "SSSSSSSSSSSSSS");
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addRetweetToTweet;
            }
            return element;
          });
          setAllTweet([...mappedArray]);
        }

        // profilTweets,
        // setProfileTweets,
        if (profilTweets) {
          const profileMap = profilTweets.map((element) => {
            console.log(element, "SSSSSSSSSSSSSS");
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addRetweetToTweet;
            }
            return element;
          });
          setProfileTweets([...profileMap]);
          console.log("AFTER SET PROFILE <<<<");
        }
        if (LIKEDTWEET) {
          const likedMap = LIKEDTWEET.map((element) => {
            console.log(element, "SSSSSSSSSSSSSS");
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addRetweetToTweet;
            }
            return element;
          });
          setLIKEDTWEET([...likedMap]);
          console.log("AFTER SET PROFILE <<<<");
        }

        //========= new set

        // console.log(mappedArray);
        ///forBookMarkPage ,
        if (bookMarkTweet) {
          const mappedBookMark = bookMarkTweet.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.addRetweetToTweet;
            }
            return element;
          });
          setBookMarkTweet([...mappedBookMark]);
        }

        ///==
        setUserRetweets([...userRetweets, tweetId]);

        ///==

        //will throw an error (populate .)
        setSingleTweet(result.data.addRetweetToTweet);
      })
      .catch((err) => {
        console.log("ADD TO RETWEET Error", err);
      });
  };

  const reTweetRemove = (tweetId) => {
    axios
      .delete(`http://localhost:5000/retweet/${tweetId}`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        if (allTweet) {
          const mappedArray = allTweet.map((element) => {
            if (element._id === tweetId) {
              return result.data.deleteReTweetFromTweet;
            }
            return element;
          });
          setAllTweet([...mappedArray]);
        }

        if (profilTweets) {
          const profileMap = profilTweets.map((element) => {
            if (element._id === tweetId) {
              return result.data.deleteReTweetFromTweet;
            }
            return element;
          });
          setProfileTweets([...profileMap]);
        }

        if (LIKEDTWEET) {
          const likedMap = LIKEDTWEET.map((element) => {
            if (element._id === tweetId) {
              return result.data.deleteReTweetFromTweet;
            }
            return element;
          });
          setLIKEDTWEET([...likedMap]);
        }

        ///BookMark
        if (bookMarkTweet) {
          const mappedBookMark = bookMarkTweet.map((element) => {
            if (element._id === tweetId) {
              console.log("INSIDE MAP", element);
              return result.data.deleteReTweetFromTweet;
            }
            return element;
          });
          setBookMarkTweet([...mappedBookMark]);
        }

        console.log("REMOVE RETWEET Result", result);
        const filterArray = userRetweets.filter((element) => {
          return element !== tweetId;
        });
        setUserRetweets([...filterArray]);
        setSingleTweet(result.data.deleteReTweetFromTweet);
      })

      .catch((err) => {
        console.log("REMOVE RETWEET Error", err);
      });
  };

  return (
    <div className="bottom-btns">
      <span
        onClick={() => {
          setIsInCommentMode(true);
        }}
      >
        <span className="CommentButton">
          <FaRegComment /> {numberOfComment}
        </span>
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
      {userRetweets.includes(tweetId) ? (
        <span className="onRetweetList"
          onClick={() => {
            reTweetRemove(tweetId);
          }}
        >
          
          <AiOutlineRetweet /> {numberOfRetweet}
          {/* REMOVE */}
        </span>
      ) : (
        <span className="NotInRetweet"
          onClick={() => {
            reTweetAdd(tweetId);
          }}
        >
          <AiOutlineRetweet /> {numberOfRetweet}
          {/* ADD TO RETWEET */}
        </span>
      )}
      {/* Like Button */}
      {userLikes.includes(tweetId) ? (
        <span className="inLikeList"
          onClick={() => {
            unLikeTweet(tweetId);
          }}
        >
           <BsHeart /> {numberOfLikes}
           {/* REMOVE */}
        </span>
      ) : (
        <span className="AddToLikes"
          onClick={() => {
            likeTweet(tweetId);
          }}
        >
           <BsHeart /> {numberOfLikes}
           {/* ADD TO LIKE */}
        </span>
      )}
    </div>
  );
};

export default Buttons;
