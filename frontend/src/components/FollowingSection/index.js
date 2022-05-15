import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import InProfileFollow from "../InProfileFollow";

const FollowingSection = () => {
  const { profileFollowing } = useContext(isLoggedInContext);

  // >>Header
  return (
    <div className="followingSection-Container">
      <div className="Links">
        <Link to="/followers">Follower</Link>
        <Link to="/following">Following</Link>
      </div>

      {profileFollowing &&
        profileFollowing.map((element) => {
          return (
            <div className="followerSection">
              <div className="image">
                <img src={`${element.profileImage}`} />
              </div>

              <div className="Container2">
                <div className="userNameAndBio">
                  <p>{element.userName}</p>
                  <p>Bio test ..</p>
                </div>

                <div className="button">
                  <InProfileFollow USER={element._id} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FollowingSection;
