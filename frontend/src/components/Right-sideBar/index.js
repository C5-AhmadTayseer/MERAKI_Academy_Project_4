import "./style.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InProfileFollow from "../InProfileFollow";
import { isLoggedInContext } from "../../App";
const RightSideBar = () => {
  const navigate = useNavigate();
  const { signInUserId, userFollower, sideDep } = useContext(isLoggedInContext);
  const [allUsers, setAllUsers] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [value, setValue] = useState("");
  const [randomUsers, setRandomUsers] = useState();
  const [news, setNews] = useState("");
  const TOKEN = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getALlUsers();
    getNews();
  }, [sideDep]);

  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f659ccb53e964a3385db4a9e8ae73b54"
      )
      .then((result) => {
        setNews([...result.data.articles].sort((a, b) => 0.5 - Math.random()));
      })
      .catch((err) => {
        console.log(err, "EERR IN NEWS");
      });
  };

  console.log(news, "SSS");
  const getALlUsers = () => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          authorization: "Bearer " + TOKEN,
        },
      })
      .then((result) => {
        console.log(result, "ALL USERS");
        setAllUsers(result.data.allUsers);
        setRandomUsers(
          [...result.data.allUsers].sort((a, b) => 0.5 - Math.random())
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const randomArray = () => {
  // }

  return (
    <div className="R-SideNar">
      {console.log(randomUsers, "TTEEEEEES")}
      {/* {console.log(randomArray)} */}
      <div className="Search">
        <input
          placeholder="Search Twitter"
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
            setIsSearch(true);
          }}
        />

        {/* {console.log(randomArray, "============")} */}
      </div>
      <div className="Trends">
        <h2>Top News</h2>
        {news &&
          news.slice(0, 3).map((element) => {
            return (
              <>
                <div className="trends-container">
                  <div className="desc">
                    {`${element.description.substr(0, 55)}...`}
                  </div>
                  <div className="desc-photo">
                    <img src={element.urlToImage} />
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="WhoToFollow">
        <h2>Who To Follow</h2>
        {randomUsers &&
          randomUsers.slice(0, 3).map((element) => {
            return (
              <>
                {element._id === signInUserId ||
                userFollower.includes(element._id) ? (
                  ""
                ) : (
                  <div className="leftSideUser">
                    <div
                      className="userPhoto"
                      onClick={() => {
                        navigate(`/profile/${element._id}`);
                      }}
                    >
                      <img src={`${element.profileImage}`} />
                    </div>
                    <div className="NameAndFollowBtn">
                      {element.userName} <InProfileFollow USER={element._id} />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        {isSearch && value !== "" ? (
          <div className="searchResult">
            {allUsers.map((element) => {
              return (
                <>
                  {element.userName
                    .toLowerCase()
                    .includes(value.toLowerCase()) ? (
                    <div className="Container-Result">
                      <div
                        className="photo-Search"
                        onClick={() => {
                          navigate(`/profile/${element._id}`);
                          setValue("")
                        }}
                      >
                        <img src={element.profileImage} />
                      </div>
                      <div className="nameAndBio-Search">
                        <p className="searchName"> {element.userName}</p>
                        <p className="bioIn">{element.Bio}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <div className="whoToFollow">
        <h2>Who to follow</h2>
    </div> */}
    </div>
  );
};

export default RightSideBar;
