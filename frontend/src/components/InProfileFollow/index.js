import React, { useState, useContext } from "react";
import axios from "axios";
import { isLoggedInContext } from "../../App";

const InProfileFollow = ({ USER }) => {
  const { userFollower, setUserFollower, signInUserId, depState, setDepState } =
    useContext(isLoggedInContext);
  const TOKEN = JSON.parse(localStorage.getItem("token"));

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
        setDepState(!depState);
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
        setDepState(!depState);
      });
  };

  return (
    <>
      {/* to not show follow and unfollow to logged in user for his profile ..  */}
      {signInUserId === USER ? (
        ""
      ) : (
        <div className="follow-unfollow">
          {userFollower.includes(USER) ? (
            <button
              onClick={() => {
                unFollow(USER);
              }}
            >
              unFollow
            </button>
          ) : (
            <button
              onClick={() => {
                follow(USER);
              }}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default InProfileFollow;
