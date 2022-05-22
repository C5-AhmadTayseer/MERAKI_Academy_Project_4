import React, { useContext } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { isLoggedInContext } from "../../App";
import InProfileFollow from "../InProfileFollow";
import { BiArrowBack } from "react-icons/bi";

const FollowingSection = () => {
  const navigate = useNavigate()
  const { profileFollowing , loggedInUserName } = useContext(isLoggedInContext);
console.log(profileFollowing);
  // >>Header
  return (
    <div className="followingSection-Container">

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
        <Link to="/followers" className="">Followers</Link>
        <Link to="/following" className="Visited">Following</Link>
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
                  {/* <p></p> */}
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
