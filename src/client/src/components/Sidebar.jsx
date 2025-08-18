import React, { useState } from "react";
import "./Sidebar.css";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AccountSection = ({ userName }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      className="account-section"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <div className="user-info">
        <div className="user-avatar">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <span className="user-name">{userName}</span>
      </div>
      {isDropdownVisible && (
        <ul className="dropdown-menu">
          <li>Account Settings</li>
          <li>Log Out</li>
        </ul>
      )}
    </div>
  );
};

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="main-links-container">
        <ul>
          <li>
            <a href="#" className="menu-item">
              <QuizOutlinedIcon className="menu-icon" />
              <span>Quizzes</span>
            </a>
          </li>
          <li>
            <a href="#" className="menu-item">
              <LeaderboardOutlinedIcon className="menu-icon" />
              <span>Leaderboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="menu-item">
              <InfoOutlinedIcon className="menu-icon" />
              <span>How it works</span>
            </a>
          </li>
        </ul>
      </div>
      <AccountSection userName="John Doe" />
    </nav>
  );
}

export default Sidebar;
