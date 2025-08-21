import React, { useState, useEffect } from "react";
import "./Question.css";
import earthAfricaOrange from "../assets/earth-africa-orange.svg";
// import QuizTimer from "../components/QuizTimer";

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
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // When a new question is passed, reset the selection
  // and shuffle the new answer options.
  useEffect(() => {
    setSelectedOption(null);

    // Collect all valid options into an array
    const options = [option1, option2, option3, option4].filter(
      (opt) => opt && opt.trim() !== ""
    );

    // Shuffle the options array using the Fisher-Yates algorithm
    // to ensure the order is random each time.
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }, [question, option1, option2, option3, option4]);

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
        <div className="question-content-text">
          <p>{question}</p>
        </div>
        <div className="question-button-box">
          {shuffledOptions.map((option) => (
            <button
              key={option}
              className="question-button"
              onClick={() => handleClick(option)}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
