import React from "react";
import "./CardBox.css";

function CardBox() {
  return (
    <div className="card-box">
      <div className="card-header">
        <div className="card-title-box">
          <div className="card-title-icon">
            <img
              src="src/assets/earth-africa.svg"
              alt="Global Cuisine Icon"
            ></img>
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
        src="src\assets\Global-cuisine.jpg"
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
            <img src="src/assets/stopwatch.svg" alt="stopwatch"></img>
          </div>
          <div className="card-rules-text">
            <p>
              You have <b>60 seconds</b> to answer as many questions as you can.
              Speed is key, but be careful —{" "}
              <i>every incorrect answer will cost you points!</i>
            </p>
          </div>
        </div>
        <button href="/quiz" className="card-button">
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default CardBox;
