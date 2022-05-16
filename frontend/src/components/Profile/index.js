import "./style.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Comments from "../Comments.js";
import Buttons from "../Buttons/index.js";
// import Follow from "../Follow/";
import DropDown from "../DropDown";
import ProfileHeader from "../ProfileHeader";

import { isLoggedInContext } from "../../App";

const Profile = () => {
  // Test ,
  const {
    profilTweets,
    setProfileTweets,
    profileFollower,
    setProfileFollower,
    profileFollowing,
    setProfileFollowing,
    signInUserId,
    setSignInUserId,
    userFollower,
    setUserFollower,
    depState,
    setDepState,
  } = useContext(isLoggedInContext);

  const { id } = useParams();
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const [userBookMark, setUserBookMark] = useState("");

  //image
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //(to use it in Profile header .)
  //info for the loggend in user (userName , pforileImage )
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInProfileImage, setLoggedInProfileImage] = useState("");
  //N1: << getProfile set user
  const [USER, setUser] = useState("");

  useEffect(() => {
    getProfile();
    console.log("DEP STATE INSIDE USE EFFECT");
  }, [depState]);

  const getProfile = () => {
    console.log(id);
    axios
      .get(`http://localhost:5000/tweets/user/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result.data, "PROFILE RESULT");
        setSignInUserId(result.data.signInUserId);
        setProfileTweets(result.data.tweets);
        //userFollowr for the logged in user .
        setUserFollower(result.data.newResult.following);
        setUserBookMark(result.data.newResult.bookMark);
        //
        setLoggedInUserName(result.data.newResult.userName);
        setLoggedInProfileImage(result.data.newResult.profileImage);
        ////
        setProfileFollower(result.data.tweets[0].userId.followers);
        setProfileFollowing(result.data.tweets[0].userId.following);
        //N1:to send it to the profile header then to inProfil follow to create a button for follow or unfollow
        setUser(result.data.tweets[0].userId._id);
        //images
        setCoverImage(result.data.tweets[0].userId.coverImage);
        // profileImage
        setProfileImage(result.data.tweets[0].userId.profileImage);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        console.log(err, "Catch inside Profile");
      });
  };

  // console.log(coverImage, "CoverImage");
  // console.log(profileFollower, "Profile Follower");
  // console.log(profileFollowing, "Profile Following");
  // console.log(USER , "==================");
  return (
    <div className="Main">
      {/* modify it  */}
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
          userName , Tweets {profilTweets.length}
        </div>
      </div>

      <ProfileHeader
        setCoverImage={setCoverImage}
        coverImage={coverImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        USER={USER}
      />

      {/* <div className="Test">
        <Link to="/followers">Followers {profileFollower.length}</Link>
        <Link to="">Following {profileFollowing.length}</Link>
      </div> */}

      <div className="tweets-Container">
        {profilTweets &&
          profilTweets.map((element, index) => {
            console.log(element, "PROFILE ELEMENT ");
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
                    <div className="tweetBody">
                      <p>Tweet Body {element.tweetBody}</p>
                    </div>
                    {/* have className tweetbtn in Buttons component */}

                    {/* i can make other info as a context . */}
                    <Buttons
                      tweetId={element._id}
                      // tweetPublisher={element.userId._id}
                      signInUserId={signInUserId}
                      userBookMark={userBookMark}
                      setUserBookMark={setUserBookMark}
                      // will use another proprs , to pass it to create comment (will make it as a button on click appear popUp)
                      // CONTEXT ?
                      //for Profile .
                      //Publisher Info
                      userNamePublisher={element.userId.userName}
                      PublisherIdProfileImg={element.userId.profileImage}
                      tweetContent={element.tweetBody}
                      //logged in info
                      loggedInUserName={loggedInUserName}
                      loggedInProfileImage={loggedInProfileImage}

                      //make it as a context
                      // setProfileTweets={setProfileTweets}
                      // profilTweets={profilTweets}
                    />
                  </div>
                </div>
                <DropDown
                  PublisherId={element.userId._id}
                  tweetId={element._id}

                  // userFollower={userFollower}
                  // setUserFollower={setUserFollower}
                  // signInUserId={signInUserId}

                  // made it in context .
                  // setProfileFollowing={setProfileFollowing}
                  // profileFollowing={profileFollowing}
                  // setProfileFollower={setProfileFollower}
                  // profileFollower={profileFollower}
                />

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
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
