import "./style.css";
import React, { useContext } from "react";
import { isLoggedInContext } from "../../App";
import { Link } from "react-router-dom";
import InProfileFollow from "../InProfileFollow";

const ProfileHeader = ({
  // set will use it for updating info .
  setCoverImage,
  setProfileImage,
  profileUserName,
  coverImage,
  profileImage,
  USER,

}) => {
  const { profileFollower, profileFollowing  } = useContext(isLoggedInContext);
  //   console.log("SSSSSSS" , profileFollower , profileFollowing);
  return (
    <div className="HeaderContainer">
      <div className="Cover">
        <img src={`${coverImage}`} />
      </div>

      <div className="img-btnContainer">
        <div className="profilImg">
          <img src={`${profileImage}`} />
        </div>
        <InProfileFollow USER={USER} />
      </div>

      <div className="userName">
        {/* <h2>userName</h2> */}
        <h2>{profileUserName}</h2>
      </div>

      <div className="info">Info.....</div>
      <div className="LinksTo">
        <Link to="/following"> <span className="number">{profileFollowing.length}</span> Following</Link>
        <Link to="/followers"> <span className="number">{profileFollower.length}</span> Followers</Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
