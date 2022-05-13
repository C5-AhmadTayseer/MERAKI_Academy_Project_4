import axios from "axios";
import React, { useContext, useState } from "react";

const FollowAndUnFollow = ({
  userFollower,
  setUserFollower,
  PublisherId,
  signInUserId,
}) => {
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
        console.log(userFollower,"UU====UU");
        setUserFollower([PublisherId , ...userFollower]);
      }).catch((err)=> { 
          console.log(err , "FollowError");
      })
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
          return element !== PublisherId;
        });
        setUserFollower(filterArray);
      });
  };

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
