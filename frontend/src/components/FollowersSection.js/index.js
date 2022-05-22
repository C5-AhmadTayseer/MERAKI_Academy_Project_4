import "./style.css"
import React, { useContext, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import InProfileFollow from "../InProfileFollow"
import { BiArrowBack } from "react-icons/bi";


const FollowersSection = () => {
  const navigate = useNavigate()
  const { profileFollower , userFollower , loggedInUserName} = useContext(isLoggedInContext);

//   console.log(profileFollower , profileFollowing,"=====================");
// >>Header 
  return <div className="followingSection-Container">

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
            <span className="inFollow">{loggedInUserName}</span>
            </div>
        </div>
      </div>


      <div className="follw-links">
      
          <Link to="/followers" className="Visited">Followers</Link>
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
              {/* <p>Bio test ..</p> */}
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
