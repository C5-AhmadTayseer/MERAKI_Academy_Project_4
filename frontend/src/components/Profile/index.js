import "./style.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Liked from "../Liked";
import Retweet from "../Re-Tweet";
import Comments from "../Comments.js";
import Buttons from "../Buttons/index.js";
// import Follow from "../Follow/";
import DropDown from "../DropDown";
import ProfileHeader from "../ProfileHeader";
import UpdateModal from "../Updateinfo";

import { BiArrowBack } from "react-icons/bi";
import { isLoggedInContext } from "../../App";
import { FaLastfm } from "react-icons/fa";

const Profile = () => {
  // Test ,
  const {
    loggedInProfileImage,
    setLoggedInProfileImage,
    loggedInUserName,
    setLoggedInUserName,
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

  // const [currentComponent, setCurrentComponent] = useState(false);
  //dependency to update profile after upload photo's on click on save button .
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  //
  const [dateOfBirthDay, setDateOfBirthDay] = useState("");
  const [Bio, setBio] = useState("");
  const [joinedAt, setJoinedAt] = useState("");

  const [isTweetSection, setisTweetSection] = useState(true);
  const [isLikeSection, setIsLikeSection] = useState(false);
  const [isRetweetSection, setIsRetweetSection] = useState(false);

  //state to toggle between component ..
  //
  const [test, setTest] = useState(false);

  //image
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //(to use it in Profile header .)
  //info for the loggend in user (userName , pforileImage )
  // const [loggedInUserName, setLoggedInUserName] = useState("");
  // const [loggedInProfileImage, setLoggedInProfileImage] = useState("");
  //N1: << getProfile set user
  const [USER, setUser] = useState("");
  //forProfile UserName
  const [profileUserName, setProfileUserName] = useState("");
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);

  useEffect(() => {
    getProfile();
    console.log("DEP STATE INSIDE USE EFFECT");
  }, [depState, userLikes, test, isProfileUpdated]);

  const getProfile = () => {
    console.log(id);
    axios
      .get(`http://localhost:5000/tweets/user/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "PROFILE RESULT =====");
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
        // profile userName INFO FOR HEADER
        setProfileUserName(result.data.tweets[0].userId.userName);
        setDateOfBirthDay(result.data.tweets[0].userId.dateOfBirthDay);
        setBio(result.data.tweets[0].userId.Bio);
        setJoinedAt(result.data.tweets[0].userId.joinedAt);

        setCoverImage(result.data.tweets[0].userId.coverImage);
        // profileImage
        setProfileImage(result.data.tweets[0].userId.profileImage);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
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
                      setTest={setTest}
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
            <span>{profileUserName}</span>
            </div>
         <span className="NumberOfTweet">{profilTweets.length} Tweets </span>
        </div>
      </div>

      <ProfileHeader
        profileUserName={profileUserName}
        Bio={Bio}
        joinedAt={joinedAt}
        dateOfBirthDay={dateOfBirthDay}
        setCoverImage={setCoverImage}
        coverImage={coverImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        USER={USER}
      />
      {/* UPDATE ========================*/}
      {/* coverImage, setCoverImage */}
      {USER === signInUserId ? (
        <span
          className="updateInfo"
          onClick={() => {
            setIsInUpdateMode(true);
          }}
        >
          Edit profile
        </span>
      ) : (
        ""
      )}
      {isInUpdateMode ? (
        <UpdateModal
          id={signInUserId}
          coverImage={coverImage}
          setIsInUpdateMode={setIsInUpdateMode}
          profileImage={profileImage}
          setIsProfileUpdated={setIsProfileUpdated}
          Bio={Bio}
          dateOfBirthDay={dateOfBirthDay}
          profileUserName={profileUserName}
        />
      ) : (
        ""
      )}
      {/* need to position it -_- */}

      <div className="linksinProfile">
        <div className="links-div">
          <span className="blue-border">
            {/* <Link to={`/profile/${id}`}>Tweets</Link> */}
            <a
              onClick={() => {
                setisTweetSection(true);
                setIsLikeSection(false);
                setIsRetweetSection(false);
              }}
            >
              Tweets
            </a>
          </span>
        </div>

        <div className="links-div">
          <span className="blue-border">
            {/* <Link to={`/liked/${id}`}> Liked Tweet </Link> */}
            <a
              onClick={() => {
                setisTweetSection(false);
                setIsLikeSection(true);
                setIsRetweetSection(false);
              }}
            >
              Liked Tweet
            </a>
          </span>
        </div>
        <div className="links-div">
          <span className="blue-border">
            <a
              onClick={() => {
                setisTweetSection(false);
                setIsLikeSection(false);
                setIsRetweetSection(true);
              }}
            >
              Retweet
            </a>
          </span>
        </div>
      </div>

      {/* <div className="Test">
        <Link to="/followers">Followers {profileFollower.length}</Link>
        <Link to="">Following {profileFollowing.length}</Link>
      </div> */}

      {isTweetSection ? <Tweets /> : ""}
      {isLikeSection ? <Liked id={id} /> : ""}
      {isRetweetSection ? <Retweet id={id} /> : ""}
    </div>
  );
};

export default Profile;
