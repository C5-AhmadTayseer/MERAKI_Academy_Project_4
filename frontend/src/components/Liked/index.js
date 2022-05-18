import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { isLoggedInContext } from "../../App";
import DropDown from "../DropDown";
import Buttons from "../Buttons";
import { useNavigate } from "react-router-dom";

const LikedTweet = ({ id }) => {
  const { LIKEDTWEET, setLIKEDTWEET, userBookMark } =
    useContext(isLoggedInContext);

  const navigate = useNavigate();
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  // const { id } = useParams();

  useEffect(() => {
    getLikedTweets();
  }, []);

  const getLikedTweets = () => {
    axios
      .get(`http://localhost:5000/likes/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "LIKED TWEET SECTION ");
        setLIKEDTWEET(result.data.likedTweets);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        console.log(err, "Catch inside Profile");
      });
  };

  console.log(LIKEDTWEET, "LIKEED");

  return (
    <div className="Main">
      {LIKEDTWEET &&
        LIKEDTWEET.map((element, index) => {
          console.log(element, "LIKEEED ELEMEEENT ");
          return (
            <div className="tweets-Container">
              <div className="oneTweet">
                <div className="publisherImg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
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
                    <p>Tweet Body {element.tweetBody}</p>
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
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LikedTweet;
