import "./style.css";
// import React , {useContext} from "react"; >> to navigate to user profile ..
import { Link , useNavigate} from "react-router-dom";



const LeftSideBar = () => {
  return (
    <div className="Left-sidebar">
      <Link to="home">
        <img className="logo" src={require("./logo.png")} />
      </Link>
      <div>
        <Link to="/home">Home</Link>
      </div>

      <div>
        <Link to="/home">Notifications</Link>
      </div>
      <div>
        <Link to="/home">Explore</Link>
      </div>
      <div>
        <Link to="/home">Messages</Link>
      </div>
      <div>
        <Link to="/bookmark">Bookmarks</Link>
      </div>
      <div>
        <Link to="/home">Lists</Link>
      </div>
      <div>
        <Link to="">Profile</Link>
      </div>
      <button>Tweet</button>
      <div> img With userName</div>
    </div>
    
  );
};

export default LeftSideBar;
