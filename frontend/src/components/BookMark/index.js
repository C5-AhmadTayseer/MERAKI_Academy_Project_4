import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Comments from "../Comments.js";
import Buttons from "../Buttons";
// import { isLoggedInContext } from "../../App";

const BookMark = () => {
  //   const { setSignInUserId, signInUserId } = useContext(isLoggedInContext);

  //Re-render Book mark page depending on button in other component ? .

  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const [signInUserId, setSignInUserId] = useState("");

  const [bookMarkTweet, setBookMarkTweet] = useState("");

  const [isBookMarkTweet, setIsBookMarkTweet] = useState(true);

  //

  useEffect(() => {
    getBookMarkTweet();
  }, []);

  const getBookMarkTweet = () => {
    axios
      .get("http://localhost:5000/bookMark", {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        if (!result) {
          setIsBookMarkTweet(false);
        }
        setBookMarkTweet(result.data.tweets);
        setSignInUserId(result.data.signInUserId);
        console.log(result, "BookMark Page");
      })
      .catch((err) => {
        console.log(err, "BookMark Error");
      });
  };

  console.log(bookMarkTweet, "AFTER SET");

  return (
    <div>
      <h2> Book Mark Page</h2>
      <div className="container">
        {/* {console.log(allTweet, "============")} */}
        {bookMarkTweet &&
          bookMarkTweet.map((element, index) => {
            return (
              <div className="result-Container">
                <div className="tweetInfo">
                  <div className="test1">
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
                  isBookMarkTweet={isBookMarkTweet}
                  tweetId={element._id}
                  tweetPublisher={element.userId._id}
                  signInUserId={signInUserId}
                  //array
                  bookMarkTweet={bookMarkTweet}
                  setBookMarkTweet={setBookMarkTweet}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookMark;
