import "./style.css";
import React, { useContext } from "react";
import { isLoggedInContext } from "../../App";
import { Link } from "react-router-dom";
import InProfileFollow from "../InProfileFollow";


const ProfileHeader = ({
    // set will use it for updating info .
  setCoverImage,
  setProfileImage,
  coverImage,
  profileImage,
  USER
}) => {
  const { profileFollower, profileFollowing } = useContext(isLoggedInContext);
//   console.log("SSSSSSS" , profileFollower , profileFollowing);
  return (
    <div className="HeaderContainer">
      <div className="profile-header">
        <div className="Cover">
          <img src={`${coverImage}`} />
        </div>
        <div className="profilImg">
          <img src={`${profileImage}`} />
        </div>
        <div>userName and info</div>
        <InProfileFollow USER={USER} />

        <div>button</div>
        <div className="Test">
 
          <Link to="/followers">Followers {profileFollower.length}</Link>
          <Link to="/following">Following {profileFollowing.length}</Link> 

        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
