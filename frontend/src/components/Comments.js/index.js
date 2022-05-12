import React from "react";

const Comments = ({ profileImage, commenterUserName, commentBody }) => {
  return (
    <div className="CommentsSection">
      <div className="test1">
        <img src={`${profileImage}`} />
        <p>{commenterUserName}</p>
      </div>
      <p>CommentBody {commentBody}</p>
    </div>
  );
};

export default Comments;
