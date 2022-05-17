import "./style.css";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import Buttons from "../Buttons";
import Comments from "../Comments.js";
import DropDown from "../DropDown";

const OneTweet = () => {
  const {
    singleTweet,
    setSingleTweet,
    allTweet,
    setAllTweet,
    setProfileTweets,
    profilTweets,
  } = useContext(isLoggedInContext);
  //other context to make a new comment inside single tweet .

  const navigate = useNavigate();
  const { id } = useParams();
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [isDeleteinProfile, setIsDeleteinProfile] = useState(true);
  //for comment in singleTweet  < will use the create comment component on click as a modal
  const [loggedInProfileImage, setLoggedInProfileImage] = useState("");
  const [comment, setComment] = useState("");

  const [isLikesOpan, setIsLikesOpan] = useState(false);

  // const [inSingleTweetAction, setInSingleTweetAction] = useState(false);

  console.log(id);

  useEffect(() => {
    OneTweet();
  }, []);

  const OneTweet = () => {
    axios
      .get(`http://localhost:5000/tweets/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "ALL RESULT IN ONE TWEET");

        console.log(result.data, "==ONE TWEET RESULT==");
        setSingleTweet(result.data.tweet);
        setUserName(result.data.tweet.userId.userName);
        // setPublisherId(result.data.tweet.userId._id);
        setPublisherId(singleTweet.userId);
        setLoggedInProfileImage(result.data.newResult.profileImage);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
      });
  };

  ///
  const commentInSingleTweet = (tweetId) => {
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
        // console.log(result, "COMMENT RESULT ");
        // console.log(profilTweets, "PROFILE TWEET IN COMMENT");
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
      })
      //For Comment in profile section

      .catch((err) => {
        console.log(err, "err in COMMENT INSIDE SINGLE COMMENT");
      });
  };

  console.log(singleTweet, "ONE TWEET");
  console.log(loggedInProfileImage, "NEW RESULT TEST");
  // console.log(userName, "user");

  //   console.log(singleTweet.userId.userName);
  //   console.log(singleTweet.userId.userName, "SS");
  console.log(singleTweet.comments);
  console.log(publisherId, "ID  TEST");
  console.log(profilTweets, "TEEST");

  return (
    //   << Header
    // Object.values(singleTweet).length
    <div className="Main">
      <div className="Section-Header">
        <div className="BackButton">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
        <div className="rightHeader">Tweet</div>
      </div>

      <div className="singleTweet-Container">
        {singleTweet !== "" && (
          <div className="single-Con">
            <div className="displayName-single">
              <div className="publisherImg-single">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
              </div>
              <div className="userName-drop">
                <p> {singleTweet.userId.userName} </p>
                <DropDown
                  tweetId={singleTweet._id}
                  // Condition because i got two results , one after update and the original one before update T_T
                  PublisherId={
                    singleTweet.userId._id
                      ? singleTweet.userId._id
                      : singleTweet.userId
                  }
                  // inSingleTweetAction={inSingleTweetAction}
                  // setInSingleTweetAction={setInSingleTweetAction}
                />
              </div>
            </div>
            <div className="tweetBody-single">
              <p>Tweet Body {singleTweet.tweetBody}</p>
            </div>
            <div className="Date-single">Date test</div>

            <div className="likesNum-single">
              {singleTweet.comments.length ? (
                <span>Comments {singleTweet.comments.length}</span>
              ) : (
                "No Comments yet"
              )}

              {/* To show likes Number and the the users like the tweet (span on click will show a popUp with the users liked the tweet ). */}
              <span
                onClick={() => {
                  setIsLikesOpan(true);
                  // will show the mapped popUp when click on it .
                }}
              >
                likes{singleTweet.likes.length}
              </span>

              {isLikesOpan ? (
                <>
                  <div className="overlay"> </div>

                  <div className="modal inProfile">
                    {singleTweet.likes && singleTweet.likes.map((element) => {
                      console.log(element, "ONCLICK");
                      return (
                        <>
                          <h2>Liked By</h2>

                          <div
                            className="oneTweet profile"
                            onClick={() => {
                              navigate(`/profile/${element._id}`);
                            }}
                          >
                            <img src={`${element.profileImage}`} />
                            <p>userName {element.userName}</p>
                          </div>
                        </>
                      );
                    })}
                    {/* can add condition if there's no likes  */}
                    <button
                      onClick={() => {
                        setIsLikesOpan(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            {/* buttons already have class name  */}
            <Buttons
              tweetId={singleTweet._id}
              tweetPublisher={singleTweet.userId}
              isDeleteinProfile={isDeleteinProfile}
            />

            <div className="replySingle">
              <div className="photoInReply">
                <img src={`${loggedInProfileImage}`} />
              </div>
              <div className="inputInReply">
                <input
                  placeholder="Tweet Your reply"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
              <div className="ReplyButton">
                <button
                  onClick={() => {
                    commentInSingleTweet(singleTweet._id);
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
            {singleTweet.comments &&
              singleTweet.comments.map((element) => {
                // comment component
                return (
                  <Comments
                    profileImage={element.commenter.profileImage}
                    commenterUserName={element.commenter.userName}
                    commentBody={element.comment}
                  />
                );
              })}
            {/* Comments Component , that will be shown just in a single tweet ,  */}
            {/* likes .*/}

            {/* {singleTweet.likes.map((element) => {
                console.log(element, "ONCLICK");
                return (
                  <div className="testAndDelete">
                    <p>userName {element.userName}</p>
                    <p>useName Photo </p>
                  </div>
                );
              })} */}
          </div>
        )}
      </div>
    </div>
  );
};
/*
     tweetId={element._id}
    tweetPublisher={element.userId._id}
*/

export default OneTweet;
