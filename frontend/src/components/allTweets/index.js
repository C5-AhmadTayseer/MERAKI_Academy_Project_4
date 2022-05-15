import "./style.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments.js";
import Buttons from "../Buttons/index.js";
import Follow from "../Follow/";
// import allTweetContext from "../../App";
import { isLoggedInContext } from "../../App";

const AllTweets = () => {
  const {
    setAllTweet,
    allTweet,
    setSignInUserId,
    signInUserId,
    userFollower,
    setUserFollower,
    userBookMark,
    setUserBookMark
  } = useContext(isLoggedInContext);

  // i got all the signin user info using backEnd with all tweets ,(to take bookmark array and later userName and profile photo to use it .)
  // const [userFollower, setUserFollower] = useState("");

  //info for the loggend in user (userName , pforileImage )
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInProfileImage, setLoggedInProfileImage] = useState("");

  const navigate = useNavigate();
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  // const [signInUserId, setSignInUserId] = useState("");
  // console.log("in alltweet app:", allTweet);
  useEffect(() => {
    getAllTweets();
  }, []);

  const getAllTweets = () => {
    axios
      .get("http://localhost:5000/tweets", {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        // console.log(result , "result from get all tweets");
        console.log(result.data);
        setSignInUserId(result.data.signInUserId);
        console.log(result , "HHOOOME");
        // console.log(result.data.tweets);
        setAllTweet(result.data.tweets);
        // setTweets(result.data.tweets);
        // console.log(result, "AFTER MODIFY BackEnd");
        // console.log(result.data.newResult.bookMark);
        setUserFollower(result.data.newResult.following);
        // console.log("xxxxxxxxxxxxxxxx", result.data.newResult.followers); << i was mistake with making it .followers T_T
        setUserBookMark(result.data.newResult.bookMark);
        
        //-- to get extra info abuot SignIn user to use it ..
        setLoggedInUserName(result.data.newResult.userName);
        setLoggedInProfileImage(result.data.newResult.profileImage);
      })
      .catch((err) => {
        console.log(err);
        // Error 404 and 403 will handle it with redirect to login
        console.log(err.response.status);
        if (err.response.status === 403 || err.response.status === 404) {
          navigate("/login");
          localStorage.clear();
          return;
        }
        console.log(err, "Catch inside getAllTweets");
      });
  };
  // console.log(userBookMark, "BOOKMARK FOR USER");

  return (
    <div className="tweets-Container">
      {/* {console.log(allTweet, "============")} */}
      {allTweet &&
        allTweet.map((element, index) => {
          // Test Values ,,
          // console.log(userFollower, "Follow ----$$");
          // console.log(loggedInUserName, "USERNAME");
          // console.log(loggedInProfileImage, "PROFILE IMAGE");
          return (
            <>
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
                  {/* have className tweetbtn in Buttons component */}
                  <Buttons
                    tweetId={element._id}
                    tweetPublisher={element.userId._id}
                    // userBookMark={userBookMark}
                    // setUserBookMark={setUserBookMark}
                    // will use another proprs , to pass it to create comment (will make it as a button on click appear popUp)

                    //Publisher Info
                    userNamePublisher={element.userId.userName}
                    PublisherIdProfileImg={element.userId.profileImage}
                    tweetContent={element.tweetBody}
                    //logged in info
                    loggedInUserName={loggedInUserName}
                    loggedInProfileImage={loggedInProfileImage}
                  />
                </div>
              </div>
              <Follow
                PublisherId={element.userId._id}
                // userFollower={userFollower}
                // setUserFollower={setUserFollower}
                // signInUserId={signInUserId}
              />

              {/* Comments component ...  */}

              {/* <Need to Modifiy To be >div On Click will open comment section . */}
              {element.comments.map((el, ind) => {
                // comment component
                return (
                  <Comments
                    profileImage={el.commenter.profileImage}
                    commenterUserName={el.commenter.userName}
                    commentBody={el.comment}
                  />
                );
              })}
              {/* Buttons */}
            </>
          );
        })}
    </div>
  );
};

export default AllTweets;
