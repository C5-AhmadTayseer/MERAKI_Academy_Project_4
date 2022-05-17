import React from "react";

const Comments = ({ profileImage, commenterUserName, commentBody }) => {
  return (
    <div className="oneTweet">
      <div className="publisherImg">
        <img src={`${profileImage}`} />
      </div>
      <div className="Container">
        <div className="displayName">
          <p>{commenterUserName}</p>
        </div>
        <div className="tweetBody">
          <p>CommentBody {commentBody}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
