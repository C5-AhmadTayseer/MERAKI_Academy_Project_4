import "./style.css";
import { FaTwitter } from "react-icons/fa";
import { RiHome7Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="Left-sidebar">
      <div className="Links">
        <Link to="home">
          <FaTwitter className="logo" />
        </Link>
        <div className="sideIcons">
          <Link to="/home">
            <RiHome7Fill />
         <span>Home</span>
          </Link>
        </div>

        <div className="sideIcons">
          <Link to="/home">Notifications</Link>
        </div>

        <div className="sideIcons">
          <Link to="/home">Explore</Link>
        </div>

        <div className="sideIcons">
          <Link to="/home">Messages</Link>
        </div>

        <div className="sideIcons">
          <Link to="/bookmark">Bookmarks</Link>
        </div>
        <div className="sideIcons">
          <Link to="/home">Lists</Link>
        </div>
        <div className="sideIcons">
          <Link to="">Profile</Link>
        </div>
      </div>
      <button>Tweet</button>

      <div> img With userName</div>
    </div>
  );
};

export default LeftSideBar;
