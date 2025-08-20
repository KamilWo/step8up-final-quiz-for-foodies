import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBox.css";
import earthAfrica from "../assets/earth-africa.svg";
import globalCuisine from "../assets/Global-cuisine.jpg";
import stopwatch from "../assets/stopwatch.svg";

function CardBox() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="card-box">
      <div className="card-header">
        <div className="card-title-box">
          <div className="card-title-icon">
            <img src={earthAfrica} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title-text">
            <div className="card-title">Global Cuisine</div>
            <div className="card-title-description">Difficulty level: Easy</div>
          </div>
        </div>
        <div className="card-header-score">
          <div className="card-header-score-text">HighScore</div>
          <div className="card-header-score-value">192</div>
        </div>
      </div>
      <img
        src={globalCuisine}
        alt="Global Cuisine Banner"
        className="card-banner-img"
      />
      <div className="card-content">
        <div className="card-content-text">
          <p>
            Ready for a trip around the world? ✈️🌍 No passport required! From
            the sizzling street food of Mexico to the savory curries of India,
            we're taking your taste buds on a global tour.
          </p>
          <p>
            Think you can tell your goulash from your gumbo? Put your foodie
            knowledge to the test!
          </p>
        </div>
        <div className="card-rules">
          <div className="card-rules-icon">
            <img src={stopwatch} alt="stopwatch"></img>
          </div>
          <div className="card-rules-text">
            <p>
              You have <b>60 seconds</b> to answer as many questions as you can.
              Speed is key, but be careful —{" "}
              <i>every incorrect answer will cost you points!</i>
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
