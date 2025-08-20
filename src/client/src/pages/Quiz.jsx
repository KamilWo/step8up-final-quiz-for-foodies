import { useState, useEffect } from "react";
import Question from "../components/Question";
import QuizEnd from "../components/QuizEnd";
import data from "../../../server/seeds/quizzes_with_options.json";
import QuizTimer from "../components/QuizTimer";

export default function Quiz() {
  const [question, setQuestion] = useState(null);
  const [highscore, setHighscore] = useState(300);
  const [score, setScore] = useState(0);
  const [showQuizEnd, setShowQuizEnd] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Whole quiz timer state
  const totalQuizDuration = 60; // seconds
  const [timeLeft, setTimeLeft] = useState(totalQuizDuration);

  // Global quiz countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowQuizEnd(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Pick a random question from data
  const random_question = () => {
    if (data.length === 0) {
      console.warn("No quiz data available.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuestion(data[randomIndex]);
  };

  // On mount → select first question
  useEffect(() => {
    random_question();
  }, []);

  const handleAnswer = (selectedOption) => {
    if (!question) return;

    if (selectedOption === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    // Move to next question after short delay
    setTimeout(() => {
      random_question();
      setFeedback(null);
    }, 400);
  };

  return (
    <>
      {/* Timer display */}
      <QuizTimer duration={totalQuizDuration} timeLeft={timeLeft} />

      {!showQuizEnd && question ? (
        <Question
          question={question.question}
          category={question.category}
          score={score}
          highscore={highscore}
          option1={question.option_01}
          option2={question.option_02}
          option3={question.option_03}
          option4={question.option_04}
          onAnswer={handleAnswer}
          feedback={feedback}
        />
      ) : (
        <QuizEnd
          category={question?.category || "Quiz"}
          highscore={highscore}
          score={score}
        />
      )}
    </>
  );
}
