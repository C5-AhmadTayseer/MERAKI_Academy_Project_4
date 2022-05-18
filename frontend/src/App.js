import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import BookMark from "./components/BookMark";
import LeftSideBar from "./components/SideBar-left";
import Profile from "./components/Profile";
import FollowersSection from "./components/FollowersSection.js";
import FollowingSection from "./components/FollowingSection";
import OneTweet from "./components/OneTweet";
import LikedTweet from "./components/Liked";
import { Routes, Route, Link } from "react-router-dom";

export const isLoggedInContext = createContext();

// export const allTweetContext = createContext();

function App() {
  //Test
  const [profileFollower, setProfileFollower] = useState("");
  const [profileFollowing, setProfileFollowing] = useState("");
  const [profilTweets, setProfileTweets] = useState("");
//like  section 
const [LIKEDTWEET , setLIKEDTWEET] = useState("")


//For BookMarkPage , 
const [bookMarkTweet, setBookMarkTweet] = useState("");


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [signInUserId, setSignInUserId] = useState("");
  const [allTweet, setAllTweet] = useState();
  const [singleTweet, setSingleTweet] = useState("");
  //
  const [userFollower, setUserFollower] = useState("");
  const [userBookMark, setUserBookMark] = useState("");
  //
  const [depState, setDepState] = useState(false);
  //
  const [profileId, setProfileId] = useState("");
  //

  //that will be used in create post to take the photo , and in leftSide bar to show image with userName values will set on all tweet (homePage)
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInProfileImage, setLoggedInProfileImage] = useState("");

  const [userLikes, setUserLikes] = useState("");

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("token"));
    if (localStorageToken) {
      setIsLoggedIn(true);
      setToken(localStorageToken);
      console.log(token, "UseEffect in App");
      return;
    }
    console.log("There's No Token in LocalStorage");
  }, []);

  return (
    <div className="App">
      <isLoggedInContext.Provider
        value={{
          setIsLoggedIn,
          setAllTweet,
          allTweet,
          signInUserId,
          setSignInUserId,
          // Test
          profileFollower,
          setProfileFollower,
          profileFollowing,
          setProfileFollowing,
          profilTweets,
          setProfileTweets,
          userFollower,
          setUserFollower,
          singleTweet,
          setSingleTweet,
          //for buttons test
          userBookMark,
          setUserBookMark,
          //for post and left-sidebar .
          loggedInUserName,
          setLoggedInUserName,
          loggedInProfileImage,
          setLoggedInProfileImage,
          //depState to re-render the page onChange for profile component .()
          depState,
          setDepState,
          //
          userLikes,
          setUserLikes,
          //
          profileId,
          setProfileId,
          //BookMarkPage 
          bookMarkTweet,
          setBookMarkTweet,
          //likeSection ...
          LIKEDTWEET,
          setLIKEDTWEET
        }}
      >
        {console.log("app", allTweet)}
        {/* Links just for testeing */}
        <LeftSideBar />
        {/* <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/home">home</Link>
        <Link to="bookmark">BookMark</Link> */}
        {/* side Bar , to be fixed before routes?  */}

        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/bookmark" element={<BookMark />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/followers" element={<FollowersSection />}></Route>
          <Route path="/following" element={<FollowingSection />}></Route>
          <Route path="/tweets/:id" element={<OneTweet />}></Route>
          <Route path="/liked" element={<LikedTweet />}></Route>
        </Routes>
      </isLoggedInContext.Provider>
    </div>
  );
}

export default App;
