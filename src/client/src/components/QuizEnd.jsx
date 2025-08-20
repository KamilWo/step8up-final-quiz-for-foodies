import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";
import earthAfricaOrange from "../assets/earth-africa-orange.svg";

function Question({ category, score, highscore }) {
  const navigate = useNavigate();

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="card-box">
      <div className="question-header">
        <div className="question-title-box">
          <div className="question-title-icon">
            <img src={earthAfricaOrange} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title">{category}</div>
        </div>
      </div>
      <div className="card-content">
        <div className="question-content-text">
          <p>Your time is up!</p>
          <p>You scored: {score}</p>
          <p>Your current highscore is: {highscore}</p>
        </div>
        <div className="question-button-box">
          <button onClick={handleDashboard} className="card-button">
            Return to dashbaoard
          </button>
          <button onClick={handleLeaderboard} className="card-button">
            View the leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
