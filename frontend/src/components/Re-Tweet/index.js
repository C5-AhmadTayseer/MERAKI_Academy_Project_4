import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { isLoggedInContext } from "../../App";
import DropDown from "../DropDown";
import Buttons from "../Buttons";
import { useNavigate } from "react-router-dom";

const Retweet = ({ id }) => {
  const { RETWEET, setRETWEET, userBookMark, userLikes, userRetweets } =
    useContext(isLoggedInContext);

  const navigate = useNavigate();
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  // const { id } = useParams();

  useEffect(
    () => {
      ReTweetSection();
    },
    [userRetweets]
  );

  const ReTweetSection = () => {
    axios
      .get(`http://localhost:5000/retweet/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "RETWEET  SECTION ");
        setRETWEET(result.data.ReTweetTweet);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        console.log(err, "Catch inside Profile");
      });
  };

  console.log(RETWEET, "RETWEET");

  return (
    <div className="Main">
      {RETWEET &&
        RETWEET.map((element, index) => {
          console.log(element, "RETWEET ELEMEEENT ");
          return (
            <div className="tweets-Container">
              <div className="oneTweet">
                <div className="publisherImg">
                  <img
                    src={element.userId.profileImage}
                    onClick={() => {
                      // console.log(element,"{{{{{{{{"); < navigate to params
                      navigate(`/profile/${element.userId._id}`);
                    }}
                  />
                </div>

                <div className="Container">
                  <div className="displayName">
                    <p> {element.userId.userName} </p>
                  </div>
                  <div
                    className="tweetBody"
                    onClick={() => {
                      navigate(`/tweets/${element._id}`);
                    }}
                  >
                    <p>{element.tweetBody}</p>
                  </div>
                  {/* For Update Button  */}

                  {/* have className tweetbtn in Buttons component */}
                  <DropDown
                    PublisherId={element.userId._id}
                    tweetId={element._id}
                    publisherUserName={element.userId.userName}
                    // add userName Publisher to follow .
                  />

                  <Buttons
                    tweetId={element._id}
                    // tweetPublisher={element.userId._id}

                    // signInUserId={signInUserId}
                    userBookMark={userBookMark}
                    // setUserBookMark={setUserBookMark}
                    // will use another proprs , to pass it to create comment (will make it as a button on click appear popUp)
                    // CONTEXT ?
                    //for Profile .
                    //Publisher Info
                    userNamePublisher={element.userId.userName}
                    PublisherIdProfileImg={element.userId.profileImage}
                    tweetContent={element.tweetBody}
                    //logged in info
                    // loggedInUserName={loggedInUserName}
                    // loggedInProfileImage={loggedInProfileImage}
                    numberOfComment={element.comments.length}
                    numberOfLikes={element.likes.length}
                    numberOfRetweet={element.reTweet.length}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Retweet;
