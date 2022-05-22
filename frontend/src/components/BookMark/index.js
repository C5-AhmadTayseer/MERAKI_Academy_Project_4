import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Comments from "../Comments.js";
import Buttons from "../Buttons";
import DropDown from "../DropDown/index.js";
import { isLoggedInContext } from "../../App";
import { BiArrowBack } from "react-icons/bi";

const BookMark = () => {
  const navigate = useNavigate()
  const { userBookMark , setBookMarkTweet , bookMarkTweet , setSignInUserId , signInUserId } = useContext(isLoggedInContext);

  //Re-render Book mark page depending on button in other component ? .

  const TOKEN = JSON.parse(localStorage.getItem("token"));
  // const [signInUserId, setSignInUserId] = useState("");


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
  console.log(userBookMark, "BOOK MARK");
  return (
    <div className="ProfileContainer">
      <div className="Main">
      <div className="Section-Header">
        <div className="BackButton">
          <span
            onClick={() => {
              navigate(-1);
            }}
          >

            <BiArrowBack />
          </span>
        </div>
        <div className="rightHeader">
            <div className="headerName">
            <span>BookMark</span>
            </div>
         {/* <span className="NumberOfTweet"> BookMark </span> */}
        </div>
      </div>


        
        {/* {console.log(allTweet, "============")} */}
        {bookMarkTweet &&
          bookMarkTweet.map((element, index) => {
            return (
                <div className="tweets-Container">
              <div className="oneTweet">
                <div className="publisherImg">
                  <img src={element.userId.profileImage} />
                </div>
                  <div className="Container">
                    <div className="displayName">
                      <p> {element.userId.userName} </p>
                    </div>
                    <div className="tweetBody">
                      <p>Tweet Body {element.tweetBody}</p>
                    </div>
                    <DropDown
                      PublisherId={element.userId._id}
                      tweetId={element._id}
                      publisherUserName={element.userId.userName}
                      //
                      isBookMarkTweet={isBookMarkTweet}
                      // signInUserId={signInUserId}
                      //array
                      bookMarkTweet={bookMarkTweet}
                      setBookMarkTweet={setBookMarkTweet}
                    />
                    <Buttons
                      tweetId={element._id}
                      tweetPublisher={element.userId._id}
                      signInUserId={signInUserId}
                      numberOfComment={element.comments.length}
                      numberOfLikes={element.likes.length}
                      numberOfRetweet ={element.reTweet.length}
                      bookMarkTweet={bookMarkTweet}
                      setBookMarkTweet={setBookMarkTweet}
                      isBookMarkTweet={isBookMarkTweet}
                      // For Create Comment ,
                      userNamePublisher={element.userId.useName}
                      PublisherIdProfileImg={element.userId.profileImage}
                      tweetContent={element.tweetBody}
                    />
                  </div>

                {/* <Buttons
                // isBookMarkTweet={isBookMarkTweet}
                tweetId={element._id}
                tweetPublisher={element.userId._id}
                signInUserId={signInUserId}
                //array
                // bookMarkTweet={bookMarkTweet}
                // setBookMarkTweet={setBookMarkTweet}
              /> */}
                {/*  */}
                {/* <DropDown
                isBookMarkTweet={isBookMarkTweet}
                tweetId={element._id}
                tweetPublisher={element.userId._id}
                signInUserId={signInUserId}
                //array
                bookMarkTweet={bookMarkTweet}
                setBookMarkTweet={setBookMarkTweet}
              /> */}
              </div>
              </div>
            );
          })}
      </div>
      </div>
  );
};

export default BookMark;
