import React, { useState, useContext } from "react";
import axios from "axios";
import { isLoggedInContext } from "../../App";

const InProfileFollow = ({ USER }) => {
  const {
    profileFollowing,
    profileFollower,
    userFollower,
    setUserFollower,
    signInUserId,
  } = useContext(isLoggedInContext);
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  // console.log(profileFollower, "INPROFILE");

  const follow = (USER) => {
    axios
      .post(
        `http://localhost:5000/users/${USER}/follow`,
        {},
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log("Follow ===", result);
        console.log(userFollower, "UU====UU");
        console.log(USER, "USER ID INSIDE FOLLOW");
        setUserFollower([...userFollower, USER]);
      })
      .catch((err) => {
        console.log(err, "PROFILE FOLLOW ERROR");
      });
  };

  const unFollow = (USER) => {
    axios
      .delete(`http://localhost:5000/users/${USER}/follow`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        console.log(result, "unFollow======");
        const filterArray = userFollower.filter((element) => {
          console.log(element, "INSIDE UNFOLLOW");
          return element !== USER;
        });
        setUserFollower([...filterArray]);
      });
  };

  return (
    <>
      {userFollower.includes(USER) ? (
        <div>
          <button
            onClick={() => {
              unFollow(USER);
            }}
          >
            unFollow
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              follow(USER);
            }}
          >
            follow
          </button>
        </div>
      )}
    </>
  );
};
export default InProfileFollow;
