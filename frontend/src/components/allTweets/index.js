import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments.js";
import Buttons from "../Buttons/index.js";
import Follow from "../Follow/";
// import allTweetContext from "../../App";
import { isLoggedInContext } from "../../App";

const AllTweets = () => {
  const { setAllTweet, allTweet } = useContext(isLoggedInContext);

  // i got all the signin user info using backEnd with all tweets ,(to take bookmark array and later userName and profile photo to use it .)

  const [userBookMark, setUserBookMark] = useState("");
  const [userFollower, setUserFollower] = useState("");
   
  //   const allTweet = allTweet;
  //   const ALL = AllTweets
  //will use useEffect to make the getAllTweets run when page runder
  const navigate = useNavigate();
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  //   const [tweets, setTweets] = useState("");

  //   context ..?
  const [signInUserId, setSignInUserId] = useState("");
  console.log("in alltweet app:", allTweet);
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
        // console.log(result.data.tweets);
        setAllTweet(result.data.tweets);
        // setTweets(result.data.tweets);
        //--
        // console.log(result, "AFTER MODIFY BackEnd");
        // console.log(result.data.newResult.bookMark);
        setUserFollower(result.data.newResult.following)
        console.log("xxxxxxxxxxxxxxxx", result.data.newResult.followers);
        setUserBookMark(result.data.newResult.bookMark);
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
    <div className="container">
      {console.log(allTweet, "============")}
      {allTweet &&
        allTweet.map((element, index) => {
          // console.log("element:",el)
          // condition in button section to detrmine if will make a delete and update
          //   let tweetPublisher = element.userId._id;
          console.log(userFollower,"Follow ----$$");
          // console.log(signInUserId);
          return (
            <div className="result-Container">
              <div className="tweetInfo">
                <div className="test1">
                  <Follow 
                  PublisherId={element.userId._id} 
                  userFollower={userFollower}
                  setUserFollower={setUserFollower}
                  signInUserId={signInUserId}
                  />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
                  <p> {element.userId.userName} </p>
                </div>
                <p>Tweet Body {element.tweetBody}</p>
              </div>

              {/* Comments component ...  */}
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

              <Buttons
                tweetId={element._id}
                tweetPublisher={element.userId._id}
                signInUserId={signInUserId}
                userBookMark={userBookMark}
                setUserBookMark={setUserBookMark}
              />
            </div>
          );
        })}
    </div>
  );
};

export default AllTweets;
