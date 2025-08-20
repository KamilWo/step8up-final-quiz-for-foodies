import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <nav className="sidebar">
      <div className="main-links-container">
        <ul>
          <li>
            <a href="/dashboard" className="menu-item">
              <InfoOutlinedIcon className="menu-icon" />
              <span>Dashboard</span>
            </a>
          </li>
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
    </nav>
  );
}

export default Sidebar;
