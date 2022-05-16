import "./style.css";
import React, { useEffect, useContext, useState  } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import { isLoggedInContext } from "../../App";
import Buttons from "../Buttons";
import Comments from "../Comments.js";
import DropDown from "../DropDown";

const OneTweet = () => {
  const { singleTweet, setSingleTweet } = useContext(isLoggedInContext);
  const navigate = useNavigate()
  const { id } = useParams();
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [isDeleteinProfile, setIsDeleteinProfile] = useState(true);
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
        console.log(result.data, "==ONE TWEET RESULT==");
        setSingleTweet(result.data.tweet);
        setUserName(result.data.tweet.userId.userName);
        // setPublisherId(result.data.tweet.userId._id);
        setPublisherId(singleTweet.userId);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
      });
  };

  console.log(singleTweet, "ONE TWEET");
  // console.log(userName, "user");

  //   console.log(singleTweet.userId.userName);
  //   console.log(singleTweet.userId.userName, "SS");
  console.log(singleTweet.comments);
  console.log(publisherId, "ID  TEST");

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
        <div className="rightHeader">
          Tweet 
        </div>
      </div>



      <div className="tweets-Container singleTweet">
        {singleTweet !== "" && (
          <div className="oneTweet">
            <div className="publisherImg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
            </div>

            <div className="Container">
              <div className="displayName">
                <p> {userName} </p>
              </div>
              <div className="tweetBody">
                <p>Tweet Body {singleTweet.tweetBody}</p>
              </div>

              <DropDown
                tweetId={singleTweet._id}
                // Condition because i got to result , one after update and the original one before update T_T
                PublisherId={singleTweet.userId._id ? singleTweet.userId._id : singleTweet.userId}
                // inSingleTweetAction={inSingleTweetAction}
                // setInSingleTweetAction={setInSingleTweetAction}
              />

              <Buttons
                tweetId={singleTweet._id}
                tweetPublisher={singleTweet.userId}
                isDeleteinProfile={isDeleteinProfile}
              />
              {/* Comments Component , that will be shown just in a single tweet ,  */}
              {singleTweet.comments.length ? (
                <span>Comments {singleTweet.comments.length}</span>
              ) : (
                "No Comments yet"
              )}
              {/* To show likes Number and the the users like the tweet (span on click will show a popUp with the users liked the tweet ). */}

              {singleTweet.likes.length ? (
                <span
                  onClick={() => {
                    // will show the mapped popUp when click on it .
                  }}
                >
                  Number of likes {singleTweet.likes.length}
                </span>
              ) : (
                "No Likes on this tweet"
              )}
              {/* likes .*/}
              {singleTweet.likes.map((element) => {
                console.log(element, "ONCLICK");
                return (
                  <div className="testAndDelete">
                    <p>userName {element.userName}</p>
                    <p>useName Photo </p>
                  </div>
                );
              })}

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
            </div>
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
