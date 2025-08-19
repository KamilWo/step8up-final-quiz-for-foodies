import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Avatar from "boring-avatars";
import { useAuth } from "../context/AuthContext";

const AccountSection = ({ userName }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logout } = useAuth();

  return (
    <div
      className="account-section"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <div className="user-info">
        <div className="user-avatar">
          <Avatar
            name={userName}
            size={40}
            colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]}
          />
        </div>
        <span className="user-name">{userName}</span>
      </div>
      {isDropdownVisible && (
        <ul className="dropdown-menu">
          <Link to="/settings">
            <li>Account Settings</li>
          </Link>
          <Link onClick={logout}>
            <li>Log Out</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

function Sidebar() {
  const { user } = useAuth();

  return (
    <nav className="sidebar">
      <div className="main-links-container">
        <ul>
          {/* <li>
            <a href="/" className="menu-item">
              <InfoOutlinedIcon className="menu-icon" />
              <span>Home</span>
            </a>
          </li> */}
          <li>
            <a href="/dashboard" className="menu-item">
              <InfoOutlinedIcon className="menu-icon" />
              <span>Dashboard</span>
            </a>
          </li>
          {/* <li>
            <a href="/quiz" className="menu-item">
              <QuizOutlinedIcon className="menu-icon" />
              <span>Quizzes</span>
            </a>
          </li> */}
          <li>
            <a href="/leaderboard" className="menu-item">
              <LeaderboardOutlinedIcon className="menu-icon" />
              <span>Leaderboard</span>
            </a>
          </li>
          <li>
            <a href="/about" className="menu-item">
              <InfoOutlinedIcon className="menu-icon" />
              <span>How it works</span>
            </a>
          </li>
        </ul>
      </div>
      {user && <AccountSection userName={user.name} />}
    </nav>
  );
}

export default Sidebar;
