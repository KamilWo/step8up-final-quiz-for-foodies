import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Question from "../components/Question";
import QuizEnd from "../components/QuizEnd";
import data from "../../../server/seeds/quizzes_with_options.json";
import QuizTimer from "../components/QuizTimer";
import { useAuth } from "../context/AuthContext";

export default function Quiz() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showQuizEnd, setShowQuizEnd] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const { category, highscore } = useParams();
  const { user } = useAuth();
  const location = useLocation();

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

  useEffect(() => {
    if (showQuizEnd && user && score > highscore) {
      const saveScore = async () => {
        try {
          await fetch("/api/rank", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id, category, score }),
          });
        } catch (error) {
          console.error("Failed to save score", error);
        }
      };
      saveScore();
    }
  }, [showQuizEnd, user, score, category, highscore]);

  // Pick a random question from data based on category
  const random_question = () => {
    const filteredData = data.filter((q) => q.category === category);
    if (filteredData.length === 0) {
      console.warn(`No quiz data available for category: ${category}`);
      setQuestion(null); // Or handle this case as needed, e.g., show a message
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    setQuestion(filteredData[randomIndex]);
  };

  // On mount → select first question
  useEffect(() => {
    random_question();
  }, [category]); // Re-run when category changes

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
          category={category || "Quiz"}
          highscore={highscore}
          score={score}
        />
      )}
    </>
  );
}
