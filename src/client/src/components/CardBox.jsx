import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBox.css";
import earthAfrica from "../assets/earth-africa.svg";
import globalCuisine from "../assets/Global-cuisine.jpg";
import stopwatch from "../assets/stopwatch.svg";

function CardBox({ icon, title, difficulty, highscore, banner, content }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="card-box">
      <div className="card-header">
        <div className="card-title-box">
          <div className="card-title-icon">
            <img src={icon} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title-text">
            <div className="card-title">{title}</div>
            <div className="card-title-description">{difficulty}</div>
          </div>
        </div>
        <div className="card-header-score">
          <div className="card-header-score-text">Your Highscore</div>
          <div className="card-header-score-value">{highscore}</div>
        </div>
      </div>
      <img
        src={banner}
        alt="Global Cuisine Banner"
        className="card-banner-img"
      />
      <div className="card-content">
        <div className="card-content-text">{content}</div>
        <div className="card-rules">
          <div className="card-rules-icon">
            <img src={stopwatch} alt="stopwatch"></img>
          </div>
          <div className="card-rules-text">
            <p>
              You have <b>60 seconds</b> to answer as many questions as you can.
              {/* Speed is key, but be careful —{" "}
              <i>every incorrect answer will cost you points!</i> */}
            </p>
          </div>
        </div>
        <button onClick={handleStartQuiz} className="card-button">
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default CardBox;
