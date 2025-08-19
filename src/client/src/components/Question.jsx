import React from "react";
import "./Question.css";
import earthAfricaOrange from "../assets/earth-africa-orange.svg";
import QuizTimer from "../components/QuizTimer";

function Question({
  category,
  highscore,
  question,
  option1,
  option2,
  option3,
  option4,
  duration,
  onTimeUp,
}) {
  return (
    <div className="card-box">
      <div className="question-header">
        <div className="question-title-box">
          <div className="question-title-icon">
            <img src={earthAfricaOrange} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title">{category}</div>
        </div>
        <div className="question-header-score">
          <div className="card-header-score-text">HighScore</div>
          <div className="card-header-score-value">{highscore}</div>
        </div>
      </div>
      <div className="card-content">
        <div className="question-timer">
          <QuizTimer duration={duration} onTimeUp={onTimeUp} />
        </div>
        <div className="question-content-text">
          <p>{question}</p>
        </div>
        <div className="question-button-box">
          <button className="question-button">{option1}</button>
          <button className="question-button">{option2}</button>
          <button className="question-button">{option3}</button>
          <button className="question-button">{option4}</button>
        </div>
      </div>
    </div>
  );
}

export default Question;
