import React from "react";
import { useNavigate } from "react-router-dom";
const Comments = ({ profileImage, commenterUserName, commentBody , id}) => {
  const navigate = useNavigate()
  return (
    <div className="oneTweet">
      <div className="publisherImg" onClick={() => {
         navigate(`/profile/${id}`)

      }}>
        <img src={`${profileImage}`} />
      </div>
      <div className="Container">
        <div className="displayName">
          <p>{commenterUserName}</p>
        </div>
        <div className="tweetBody">
          <p>{commentBody}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
