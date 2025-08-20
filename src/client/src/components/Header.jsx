import React, { useState } from "react";
import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "boring-avatars";

const Header = () => {
  // Use the useAuth hook to get the logged-in user's data
  const { user } = useAuth();

  return (
    <>
      <header className="header-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo} alt="Your Website Logo" className="logo-image" />
        </div>

        {/* Action Icons Section */}
        <div className="action-icons">
          {/* Notification Bell Icon */}
          <a href="#" className="icon-link">
            <NotificationsNoneIcon className="header-icon" />
          </a>

          {/* Help Icon */}
          <a href="#" className="icon-link">
            <HelpOutlineIcon className="header-icon" />
          </a>
        </div>

        {user && <AccountSection userName={user.name} />}
      </header>
    </>
  );
};

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

export default Header;
