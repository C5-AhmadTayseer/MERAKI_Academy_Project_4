import React , {useState , useContext} from "react";
import "./style.css";
import { FaTwitter, FaHashtag , FaSignOutAlt} from "react-icons/fa";
import { RiHome7Fill } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import PopUpPost from "../PopUpPost";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInContext } from "../../App";
const LeftSideBar = () => {
  const navigate = useNavigate()
  const {loggedInProfileImage , loggedInUserName ,signInUserId , setIsLoggedIn} = useContext(isLoggedInContext)
const [isOpen , setIsOpen] = useState(false)

const signOut = () => { 
  setIsLoggedIn(false)
  localStorage.clear()
  navigate("/login")
}

console.log("TEESt" , loggedInProfileImage , loggedInUserName);
  return (
    <div className="Left-sidebar">
      
      <div className="Links">
        <Link to="home">
          <FaTwitter className="logo" />
        </Link>
        <div className="sideIcons">
          <div>
            <Link to="/home">
              <RiHome7Fill />
            </Link>
          </div>
          <div>
            <span>Home</span>
          </div>
        </div>

        

        <div className="sideIcons">
          <div>
            <Link to="/bookmark">
              <BsBookmark />
            </Link>
          </div>
          <div>
            <span>Bookmarks</span>
          </div>
        </div>

        <div className="sideIcons" onClick={() => {
             navigate(`/profile/${signInUserId}`)
          }}>
          <div >
            <Link to=""> <CgProfile /> </Link>
          </div>
          <div>
            <span>Profile</span>
          </div>
        </div>
      </div>

      <button className="sideBarbtn" onClick={() => {
        setIsOpen(true)
      }}>Tweet</button>
    {isOpen ? <PopUpPost setIsOpen={setIsOpen} /> : ""}
      <div className="userLeftSideBar">
      <div className="userLeftSideBarimg">
        <img src={loggedInProfileImage}/>
      </div>
        <div className="LefticonAndName">
          <span> {loggedInUserName}</span>
          <span onClick={() => {
            signOut()
          }}> <FaSignOutAlt /> </span>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
