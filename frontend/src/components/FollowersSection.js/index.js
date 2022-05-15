import "./style.css"
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import InProfileFollow from "../InProfileFollow"

const FollowersSection = () => {
  const { profileFollower , userFollower} = useContext(isLoggedInContext);

//   console.log(profileFollower , profileFollowing,"=====================");
// >>Header 
  return <div className="followingSection-Container">
      <div className="Links">
          <Link to="/followers">Follower</Link>
          <Link to="/following">Following</Link>
      </div>

      {profileFollower && profileFollower.map((element)=>{
        console.log(element._id , "USEER" , userFollower ,"USERFOLLOWE");
          return <div className="followerSection">
              <div className="image">
              <img src={`${element.profileImage}`}/>
              </div>
                
                <div className="Container2">
              <div className="userNameAndBio">
              <p>{element.userName}</p>
              <p>Bio test ..</p>
              </div>
              {/* {console.log(element._id ,"USEER " , userFollower , "USEEER FOLLOWER" ) */}

              <div className="button">
            <InProfileFollow USER ={element._id}/>
              </div>
              </div>
          </div>
      })}


  </div>;
};

export default FollowersSection;
