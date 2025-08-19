import { useState } from "react";
import Question from "../components/Question";
import data from "../../../server/seeds/quizzes_with_options.json";
export default function Quiz() {
  const [question, setQuestions] = useState(data);
  const [highscore, setHighscore] = useState(300);

  return (
    <>
      <Question
        question={question[0].question}
        category={question[0].category}
        highscore={highscore}
        option1={question[0].option_01}
        option2={question[0].option_02}
        option3={question[0].option_03}
        option4={question[0].option_04}
      ></Question>
    </>
  );
}
