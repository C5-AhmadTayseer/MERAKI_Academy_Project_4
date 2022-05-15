import axios from "axios";
import React, { useContext, useState } from "react";

import { isLoggedInContext } from "../../App";

const FollowAndUnFollow = ({
  PublisherId,
  // signInUserId,
  // setProfileFollower,
  // setProfileFollowing,
  // profileFollower,
  // profileFollowing,
}) => {
  const {
    profileFollower,
    setProfileFollower,
    profileFollowing,
    setProfileFollowing,
    signInUserId,
    userFollower,
    setUserFollower,
  } = useContext(isLoggedInContext);

  //   const [isFollowed, setIsFollowed] = useState(false);
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const follow = (PublisherId) => {
    // console.log(PublisherId, userFollower);

    axios
      .post(
        `http://localhost:5000/users/${PublisherId}/follow`,
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
        console.log(PublisherId, "PUBLISHER ID INSIDE FOLLOW");
        if (profileFollower) {
          console.log(profileFollower, signInUserId, "@@@@");
          setProfileFollower([signInUserId, ...profileFollower]);
        }
        setUserFollower([PublisherId, ...userFollower]);
      })
      .catch((err) => {
        console.log(err, "FollowError");
      });
  };

  const unFollow = (PublisherId) => {
    console.log(PublisherId, userFollower);
    axios
      .delete(`http://localhost:5000/users/${PublisherId}/follow`, {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        console.log(result, "unFollow======");
        const filterArray = userFollower.filter((element) => {
          console.log(element, "INSIDE UNFOLLOW");
          return element !== PublisherId;
        });
        //condition to not have error when add to follow in home page ..
        if (profileFollower) {
          const filterForProfile = profileFollower.filter((element) => {
            if (element._id) {
              return element._id !== signInUserId;
            }
            if (element) {
              return element !== signInUserId;
            }
          });
          setProfileFollower(filterForProfile);
        }
        setUserFollower(filterArray);
      });
  };
console.log(userFollower , PublisherId , "NNNEW");
  return (
    <div>
      {PublisherId === signInUserId ? (
        ""
      ) : (
        <div>
          {userFollower.includes(PublisherId) ? (
            <button
              onClick={() => {
                unFollow(PublisherId);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              onClick={() => {
                follow(PublisherId);
              }}
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowAndUnFollow;
