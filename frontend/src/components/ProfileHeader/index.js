import "./style.css";

import React from "react";

const ProfileHeader = ({
  setCoverImage,
  setProfileImage,
  coverImage,
  profileImage,
}) => {
  return (
    <div className="profile-header">
      <div className="Cover">
        <img src={`${coverImage}`} />
      </div>
      <div className="profilImg">
        <img src={`${profileImage}`} />
      </div>
    </div>
  );
};

export default ProfileHeader;
