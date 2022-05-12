import "./style.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { isLoggedInContext } from "../../App";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useContext(isLoggedInContext);
  // console.log(token , " Token in HomePage");
  //   const TOKEN = token;
  //<< it's give me fail (on render) when used it in this way , so i will take the token directly from the local Storage .

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const [tweets, setTweets] = useState("");
  const [signInUserId, setSignInUserId] = useState("");
  const [tweetBody, setTweetBody] = useState("");

  //will use useEffect to make the getAllTweets run when page runder

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
        // console.log(result.data);
        setSignInUserId(result.data.signInUserId);
        console.log(result.data.tweets);
        setTweets(result.data.tweets);
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

  const updateTweet = (tweetId) => {
    axios
      .put(
        `http://localhost:5000/tweets/${tweetId}`,
        {
          tweetBody,
        },
        {
          headers: {
            authorization: "Bearer " + TOKEN,
          },
        }
      )
      .then((result) => {
        console.log(result, "Update Tweet Result");
        getAllTweets();
      })
      .catch((err) => {
        console.log(err, "err in update Tweet");
      });
  };

  return (
    <div>
      <h2>Home Page</h2>
      {/* classname just for test */}
      <div className="container">
        {tweets &&
          tweets.map((element, index) => {
            let tweetPublisher = element.userId._id;
            // console.log(signInUserId);
            return (
              <div className="result-Container">
                <div className="tweetInfo">
                  <div className="test1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
                    <p> {element.userId.userName} </p>
                  </div>

                  <p>Tweet Body {element.tweetBody}</p>
                </div>
                {/* using Modal .. will set the element id and then the modal box send it make the proccess*/}
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
                        updateTweet(element._id);
                      }}
                    >
                      update
                    </button>
                  </div>
                ) : (
                  ""
                )}

                {element.comments.map((el, i) => {
                  return (
                    <div className="CommentsSection">
                      <div className="test1">
                        {/* will modify the other image to be dynamic on update the static link just for testing . */}
                        <img src={`${el.commenter.profileImage}`} />
                        <p>{el.commenter.userName}</p>
                      </div>
                      <p>CommentBody {el.comment}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
