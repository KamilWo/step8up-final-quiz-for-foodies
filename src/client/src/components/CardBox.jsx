import React from "react";
import "./CardBox.css";

function CardBox() {
  return (
    <div class="card-box">
      <div class="card-header">
        <div class="card-title-box">
          <div class="card-title-icon">
            <img
              src="src/assets/earth-africa.svg"
              alt="Global Cuisine Icon"
            ></img>
          </div>
          <div class="card-title-text">
            <div class="card-title">Global Cuisine</div>
            <div class="card-title-description">Difficulty level: Easy</div>
          </div>
        </div>
        <div class="card-header-score">
          <div class="card-header-score-text">HighScore</div>
          <div class="card-header-score-value">192</div>
        </div>
      </div>
      <img
        src="src\assets\Global-cuisine.jpg"
        alt="Global Cuisine Banner"
        class="card-banner-img"
      />
      <div class="card-content">
        <div class="card-content-text">
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
        <div class="card-rules">
          <div class="card-rules-icon">
            <img src="src/assets/stopwatch.svg" alt="stopwatch"></img>
          </div>
          <div class="card-rules-text">
            <p>
              You have <b>60 seconds</b> to answer as many questions as you can.
              Speed is key, but be careful —{" "}
              <i>every incorrect answer will cost you points!</i>
            </p>
          </div>
        </div>
        <button class="card-button">Start Quiz</button>
      </div>
    </div>
  );
}

export default CardBox;
