import React, { useState, useEffect } from "react";
import "./Question.css";
import earthAfricaOrange from "../assets/earth-africa-orange.svg";
import QuizTimer from "../components/QuizTimer";

function Question({
  category,
  score,
  highscore,
  question,
  option1,
  option2,
  option3,
  option4,
  duration,
  onTimeUp,
  onAnswer,
  answer,
  feedback,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset selectedOption when the question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleClick = (option) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  // Determine feedback class
  let feedbackClass = "";
  if (feedback === "correct") feedbackClass = "glow-correct";
  if (feedback === "wrong") feedbackClass = "glow-wrong";

  return (
    <div className={`card-box ${feedbackClass}`}>
      <div className="question-header">
        <div className="question-title-box">
          <div className="question-title-icon">
            <img src={earthAfricaOrange} alt="Global Cuisine Icon"></img>
          </div>
          <div className="card-title">{category}</div>
        </div>
        <div className="question-header-score">
          <div className="card-header-score-text">Score</div>
          <div className="card-header-score-value">{score}</div>
        </div>
        <div className="question-header-score">
          <div className="card-header-score-text">&nbsp;HighScore</div>
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
          <button
            className="question-button"
            onClick={() => handleClick(option1)}
            disabled={!!selectedOption}
          >
            {option1}
          </button>
          <button
            className="question-button"
            onClick={() => handleClick(option2)}
            disabled={!!selectedOption}
          >
            {option2}
          </button>
          <button
            className="question-button"
            onClick={() => handleClick(option3)}
            disabled={!!selectedOption}
          >
            {option3}
          </button>
          <button
            className="question-button"
            onClick={() => handleClick(option4)}
            disabled={!!selectedOption}
          >
            {option4}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
