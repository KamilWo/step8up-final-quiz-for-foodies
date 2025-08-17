import React from "react";
import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <header className="header-container">
        {}
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
      </header>
    </>
  );
};

export default Header;
