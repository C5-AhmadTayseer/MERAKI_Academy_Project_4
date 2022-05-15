import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import BookMark from "./components/BookMark";
import LeftSideBar from "./components/SideBar-left";
import Profile from "./components/Profile";
import FollowersSection from "./components/FollowersSection.js";
import { Routes, Route, Link } from "react-router-dom";

export const isLoggedInContext = createContext();

// export const allTweetContext = createContext();

function App() {
//Test
const [profileFollower, setProfileFollower] = useState("");
const [profileFollowing, setProfileFollowing] = useState("");
const [profilTweets, setProfileTweets] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [signInUserId, setSignInUserId] = useState("");
  const [allTweet, setAllTweet] = useState();
//
const [userFollower, setUserFollower] = useState("");


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
          setUserFollower
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
          <Route
            path="/followers"
            element={<FollowersSection />}
          ></Route>
        </Routes>
      </isLoggedInContext.Provider>
    </div>
  );
}

export default App;
