import "./style.css";
import React, { useState } from "react";
import axios from "axios";

const UpdateModal = ({
  id,
  coverImage,
  setIsInUpdateMode,
  profileImage,
  setIsProfileUpdated,
  Bio,
  dateOfBirthDay,
  profileUserName,
}) => {
  // ^ {id}
  const idForUser = id; //not work directly so i set it in variable ,

  const TOKEN = JSON.parse(localStorage.getItem("token"));

  //Updating Profile
  const [birthDay, setBirthday] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateBio, setUpdateBio] = useState("");

  //for Cover Image ,url1 Cover
  const [image1, setImage1] = useState("");
  const [url1, setUrl1] = useState("");
  const [isUploadeCover, setIsUploadCover] = useState(false);
  const [isCoverImgSet, setIsCoverImgSet] = useState(false);
  //same logic for Profile Image ..url2 Profile
  const [image2, setImage2] = useState("");
  const [url2, setUrl2] = useState("");
  const [isUploadProfile, setIsUploadProfile] = useState(false);
  const [isProfileImgSet, setIsProfileImgSet] = useState(false);

  // console.log(url1, "URL1"); < Cover .
  const uploadImage1 = () => {
    setIsCoverImgSet(false);
    const formData = new FormData();
    formData.append("file", image1);
    // data.append("file", image);
    formData.append("upload_preset", "a.taha");
    // data.append("cloud_name", "a-taha-p4");
    axios
      .post("https://api.cloudinary.com/v1_1/a-taha-p4/image/upload", formData)
      .then((result) => {
        console.log(result);
        setUrl1(result.data.url);
        setIsUploadCover(true);
        console.log(url1, "COVER URL");
      })
      .catch((err) => console.log(err));
  };

  //<<Profile image

  const uploadImage2 = () => {
    setIsProfileImgSet(false);
    const formData = new FormData();
    formData.append("file", image2);
    // data.append("file", image);
    formData.append("upload_preset", "a.taha");
    // data.append("cloud_name", "a-taha-p4");
    axios
      .post("https://api.cloudinary.com/v1_1/a-taha-p4/image/upload", formData)
      .then((result) => {
        console.log(result);
        setUrl2(result.data.url);
        setIsUploadProfile(true);
        console.log(url1, "COVER URL");
      })
      .catch((err) => console.log(err));
  };

  const updateProfile = (idForUser) => {
    let newProfileImage = url2 || profileImage;
    let newCoverImage = url1 || coverImage;
    let newUserName = updateName || profileUserName;
    let newBio = updateBio || Bio;
    let newBirthDay = birthDay || dateOfBirthDay;

    console.log(idForUser, "USER ID");
    console.log(url2, "URL2 ON SAVE");
    console.log(url1, " URL1 ON SAVE");
    axios
      .put(
        `http://localhost:5000/users/${idForUser}`,
        {
          coverImage: `${newCoverImage}`,
          profileImage: `${newProfileImage}`,
          Bio: newBio,
          dateOfBirthDay: newBirthDay,
          userName: newUserName,

          // userName:"aSDSD"
        },
        {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        // console.log("URL =========");
        console.log(res);
        console.log("DATA UPDATED");
        setIsProfileUpdated(true);
        setIsInUpdateMode(false);
      })
      .catch((err) => {
        console.log(err, "IN PROFILE UPDATE");
      });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="updateModal">
        <div className="EditProfile">
          <h2>Edit Pofile</h2>
        </div>

        <button
          className="Save"
          onClick={() => {
            updateProfile(idForUser);
          }}
        >
          Save
        </button>

        <span
          className="Close"
          onClick={() => {
            setIsInUpdateMode(false);
          }}
        >
          X
        </span>

        <div className="coverContainer">
          {isUploadeCover ? (
            <div className="coverImg">
              <img src={url1} />
            </div>
          ) : (
            <div className="coverImg">
              <img src={coverImage} />
            </div>
          )}

          <div className="UploadInput">
            <input
              type="file"
              onChange={(e) => {
                setImage1(e.target.files[0]);
                setIsCoverImgSet(true);
              }}
            ></input>
            {isCoverImgSet ? uploadImage1() : ""}
          </div>
        </div>

        <div className="profileImgContainer">
          {isUploadProfile ? (
            <div className="inUpdateProfileImg">
              <img src={url2} />
            </div>
          ) : (
            <div className="inUpdateProfileImg">
              <img src={profileImage} />
            </div>
          )}
        </div>

        <div className="UploadInput2">
          <input
            type="file"
            onChange={(e) => {
              setImage2(e.target.files[0]);
              setIsProfileImgSet(true);
            }}
          ></input>
          {isProfileImgSet ? uploadImage2() : ""}
        </div>
        <div className="Updatinginput">
          <div className="updateName">
            <span className="placeholder1">Name</span>
            <input
              defaultValue={profileUserName}
              onChange={(e) => {
                setUpdateName(e.target.value);
              }}
            />
          </div>
          <div className="updateBio">
            <span className="placeholder2">Bio</span>
            <input
              defaultValue={Bio}
              onChange={(e) => {
                setUpdateBio(e.target.value);
              }}
            />
          </div>
          <div className="updateBirthDate">
            <span className="placeholder3">Birth date</span>{" "}
            <input

              defaultValue={dateOfBirthDay.substr(0, 10)}
              type="date"
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div>{/* <img src={url} /> */}</div>
    </>
  );
};

export default UpdateModal;
