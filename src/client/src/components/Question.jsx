import React from "react";
import "./Question.css";
import earthAfricaOrange from "../assets/earth-africa-orange.svg";

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
    <div class="card-box">
      <div class="question-header">
        <div class="question-title-box">
          <div class="question-title-icon">
            <img src={earthAfricaOrange} alt="Global Cuisine Icon"></img>
          </div>
          <div class="card-title">{category}</div>
        </div>
        <div class="question-header-score">
          <div class="card-header-score-text">HighScore</div>
          <div class="card-header-score-value">{highscore}</div>
        </div>
      </div>
      <div class="card-content">
        <div class="question-timer">
          <QuizTimer duration={duration} onTimeUp={onTimeUp} />
        </div>
        <div class="question-content-text">
          <p>{question}</p>
        </div>
        <div class="question-button-box">
          <button class="question-button">{option1}</button>
          <button class="question-button">{option2}</button>
          <button class="question-button">{option3}</button>
          <button class="question-button">{option4}</button>
        </div>
      </div>
    </div>
  );
}

export default Question;
