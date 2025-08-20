import { useState, useEffect } from "react";
import Question from "../components/Question";
import data from "../../../server/seeds/quizzes_with_options.json";
import QuizTimer from "../components/QuizTimer";

export default function Quiz() {
  const [question, setQuestions] = useState(data);
  const [highscore, setHighscore] = useState(300);
  const [score, setScore] = useState(0);

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
    alert(" Time is up!");
    // add current quiz score to database
    // navigate back to dashboard
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === question.answer) {
      setScore((prev) => prev + 1);
      alert("Correct!");
    } else {
      alert("Not quite!");
    }
    random_question();
  };

  return (
    <>
      <Question
        question={question.question}
        category={question.category}
        score={score}
        highscore={highscore}
        option1={question.option_01}
        option2={question.option_02}
        option3={question.option_03}
        option4={question.option_04}
        answer={question.answer}
        duration={60}
        onTimeUp={handleTimeUp}
        onAnswer={handleAnswer}
      ></Question>
    </>
  );
}
