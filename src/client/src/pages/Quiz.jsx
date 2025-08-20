import { useState, useEffect } from "react";
import Question from "../components/Question";
import QuizEnd from "../components/QuizEnd";
import data from "../../../server/seeds/quizzes_with_options.json";
import QuizTimer from "../components/QuizTimer";

export default function Quiz() {
  const [question, setQuestions] = useState(data);
  const [highscore, setHighscore] = useState(300);
  const [score, setScore] = useState(0);
  const [showQuizEnd, setShowQuizEnd] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Whole quiz timer state
  const totalQuizDuration = 60;
  const [timeLeft, setTimeLeft] = useState(totalQuizDuration);

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

  const random_question = () => {
    // Data not empty
    if (data.length === 0) {
      console.warn("No quiz data available to select a random question.");
      return; // Set a default/null state for question
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuestions(data[randomIndex]); // Update the state with the randomly selected question
  };

  // Call random_question when the component mounts
  useEffect(() => {
    random_question();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleTimeUp = () => {
    setShowQuizEnd(true);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    random_question();
    // Wait, then move to next question and clear feedback
    setTimeout(() => {
      setFeedback(null);
    }, 200);
  };

  return (
    <>
      {/* Render the timer at the top */}
      <QuizTimer
        duration={totalQuizDuration}
        onTimeUp={handleTimeUp}
        timeLeft={timeLeft}
      />
      {!showQuizEnd ? (
        <Question
          question={question.question}
          category={question.category}
          score={score}
          highscore={highscore}
          option1={question.option_01}
          option2={question.option_02}
          option3={question.option_03}
          option4={question.option_04}
          // duration={60}
          // onTimeUp={handleTimeUp}
          onAnswer={handleAnswer}
          feedback={feedback}
        />
      ) : (
        <QuizEnd
          category={question.category}
          highscore={highscore}
          score={score}
        />
      )}
    </>
  );
}
