import "./style.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Liked from "../Liked";
import Comments from "../Comments.js";
import Buttons from "../Buttons/index.js";
// import Follow from "../Follow/";
import DropDown from "../DropDown";
import ProfileHeader from "../ProfileHeader";

import { isLoggedInContext } from "../../App";

const Profile = () => {
  // Test ,
  const {
    setUserBookMark,
    userBookMark,
    //NEW
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
    userLikes,
  } = useContext(isLoggedInContext);

  const { id } = useParams();
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  // const [userBookMark, setUserBookMark] = useState("");

const [currentComponent , setCurrentComponent] = useState(false)

  //image
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //(to use it in Profile header .)
  //info for the loggend in user (userName , pforileImage )
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInProfileImage, setLoggedInProfileImage] = useState("");
  //N1: << getProfile set user
  const [USER, setUser] = useState("");
  //forProfile UserName
  const [profileUserName, setProfileUserName] = useState("");
  useEffect(() => {
    getProfile();
    console.log("DEP STATE INSIDE USE EFFECT");
  }, [depState, userLikes]);

  const getProfile = () => {
    console.log(id);
    axios
      .get(`http://localhost:5000/tweets/user/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "PROFILE RESULT");
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
        // profile userName
        setProfileUserName(result.data.tweets[0].userId.userName);

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

  const Tweets = () => {
    return (
      <div className="Main">
        {profilTweets &&
          profilTweets.map((element, index) => {
            console.log(element, "PROFILE ELEMENT ");
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
  /////////////make it as a spreated component , to switch between other components ,

  // console.log(coverImage, "CoverImage");
  // console.log(profileFollower, "Profile Follower");
  // console.log(profileFollowing, "Profile Following");
  // console.log(USER , "==================");
  return (
    <div className="ProfileContainer">
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
        profileUserName={profileUserName}
        setCoverImage={setCoverImage}
        coverImage={coverImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        USER={USER}
      />
      {/* need to position it -_- */}
      {/* {USER === signInUserId ? <span className="updateInfo"> UPDATE TEST</span> : ""} */}

      <div className="linksinProfile">

        <div className="links-div">
          <span className="blue-border">
            {/* <Link to={`/profile/${id}`}>Tweets</Link> */}
            <a onClick={()=> { 
              setCurrentComponent(true)
            }}>Tweets</a>
          </span>
        </div>

        <div className="links-div">
          <span className="blue-border">
            {/* <Link to={`/liked/${id}`}> Liked Tweet </Link> */}
            <a onClick={() => {
              setCurrentComponent(false)
            }}>Liked Tweet</a>
          </span>
        </div>
        <div className="links-div">
          <span className="blue-border">
            <Link to="">Re-tweet</Link>
          </span>
        </div>
      </div>

      {/* <div className="Test">
        <Link to="/followers">Followers {profileFollower.length}</Link>
        <Link to="">Following {profileFollowing.length}</Link>
      </div> */}

      {currentComponent ? <Tweets /> : <Liked  id={id}/>}
    </div>
  );
};

export default Profile;
