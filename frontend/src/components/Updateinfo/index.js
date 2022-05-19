import "./style.css";
import React, { useState } from "react";
import axios from "axios";

const UpdateModal = ({ id }) => {

  const idForUser = id
  const TOKEN = JSON.parse(localStorage.getItem("token"));
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = ({ id }) => {
    const formData = new FormData();
    formData.append("file", image);
    // data.append("file", image);
    formData.append("upload_preset", "a.taha");
    // data.append("cloud_name", "a-taha-p4");
    axios
      .post("https://api.cloudinary.com/v1_1/a-taha-p4/image/upload", formData)
      .then((result) => {
        console.log(result);
        setUrl(result.data.url);
        console.log(url, "SSS");

        if (result) {
            console.log(idForUser , "AFTER RESULT");
            console.log(url , "AFTER RESULT");
          axios
            .put(
              `http://localhost:5000/users/${idForUser}`,
              {
                coverImage:`${url}`
              },
              {
                headers: {
                  authorization: `Bearer ${TOKEN}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="updateModal">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
        <div>
          <h1>Uploaded image will be displayed here</h1>
          <img src={url} />
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
