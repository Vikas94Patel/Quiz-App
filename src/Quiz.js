import React, { useState } from "react";
import QuizData from "./QuizData";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempted, setAttempt] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const [score, setScore] = useState(0);

  const handleOptionClick = (id, answer) => {
    if (
      answer === QuizData[currentQuestion].answer &&
      !attempted.includes(id)
    ) {
      setScore(score + 1);
      setAttempt((prev) => [...prev, id]);
    } else if (
      answer === QuizData[currentQuestion].answer &&
      attempted.includes(id)
    ) {
    } else if (
      answer !== QuizData[currentQuestion].answer &&
      attempted.includes(id)
    ) {
      setScore(score - 1);
      const newAttempted = attempted.filter((item) => item !== id);
      setAttempt(newAttempted);
      console.log(attempted);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < QuizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {QuizData.length}
        </div>
      ) : (
        <div>
          <div className="styles.question-section">
            <div className="question-count">
              <span>Question : {currentQuestion + 1}</span>
            </div>
            <div className="question-text">
              <p>{QuizData[currentQuestion].question}</p>
            </div>
          </div>
          <div className="answer-section">
            {QuizData[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() =>
                  handleOptionClick(QuizData[currentQuestion].id, option)
                }
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <button className="prevbutton" onClick={handlePrevClick}>
              Previous
            </button>
            <button className="nextbutton" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
