import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardBox.css";
import earthAfrica from "../assets/earth-africa.svg";
import globalCuisine from "../assets/Global-cuisine.jpg";
import stopwatch from "../assets/stopwatch.svg";
import { useAuth } from "../context/AuthContext";

function CardBox({ category }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const fetchHighScore = async () => {
      if (user) {
        const userId = user.id;
        try {
          const response = await fetch(
            `/api/rank/${userId}/${encodeURIComponent(category)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setHighScore(data.score); // Assuming the API returns an object with a 'score' property
        } catch (error) {
          console.error("Error fetching high score:", error);
          setHighScore(0); // Set to 0 in case of error
        }
      }
    };

    fetchHighScore();
  }, [user, category]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(category)}/${highScore}`);
  };

  return (
    <div className="card-box">
      <div className="card-header">
        <div className="card-title-box">
          <div className="card-title-icon">
            <img src={earthAfrica} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title-text">
            <div className="card-title">{category}</div>
            <div className="card-title-description">Difficulty level: Easy</div>
          </div>
        </div>
        <div className="card-header-score">
          <div className="card-header-score-text">HighScore</div>
          <div className="card-header-score-value">{highScore}</div>
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
