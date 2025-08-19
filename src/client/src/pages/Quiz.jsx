import { useState, useEffect } from "react";
import Question from "../components/Question";
import data from "../../../server/seeds/quizzes_with_options.json";

export default function Quiz() {
  const [question, setQuestions] = useState(data);
  const [highscore, setHighscore] = useState(300);

  function random_question() {
    // Data not empty
    if (data.length === 0) {
      console.warn("No quiz data available to select a random question.");
      return; // Set a default/null state for question
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuestions(data[randomIndex]); // Update the state with the randomly selected question
  }

  // Call random_question when the component mounts
  useEffect(() => {
    random_question();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Question
        question={question.question}
        category={question.category}
        highscore={highscore}
        option1={question.option_01}
        option2={question.option_02}
        option3={question.option_03}
        option4={question.option_04}
      ></Question>
    </>
  );
}
