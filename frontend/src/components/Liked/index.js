import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LikedTweet = () => {
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  const { id } = useParams();

  useEffect(() => {
    getLikedTweets()
  },[]);

  const getLikedTweets = () => {
    axios
      .get(`http://localhost:5000/likes/${id}`, {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "LIKED TWEET SECTION ");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        console.log(err, "Catch inside Profile");
      });
  };

  return (
    <div>
      LIKED SECTION
      <p>{id}</p>
    </div>
  );
};

export default LikedTweet;
