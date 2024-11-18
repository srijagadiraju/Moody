import React, { useState } from "react";
import "../styles/Questions.css";

const Questions = () => {
  const sampleData = [
    {
      id: 1,
      question: "What is your favorite person?",
      answers: [
        { id: 1, text: "Shivam" },
        { id: 2, text: "Srija" },
        { id: 3, text: "Vicki" },
        { id: 4, text: "Monisha" },
      ],
    },
    {
      id: 2,
      question: "What is your favorite animal?",
      answers: [
        { id: 1, text: "Cat" },
        { id: 2, text: "Dog" },
        { id: 3, text: "Bird" },
        { id: 4, text: "Fish" },
      ],
    },
    {
      id: 3,
      question: "What is your favorite season?",
      answers: [
        { id: 1, text: "Spring" },
        { id: 2, text: "Summer" },
        { id: 3, text: "Autumn" },
        { id: 4, text: "Winter" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerId,
    });
  };

  const handleNavigate = (direction) => {
    if (direction === "next" && currentQuestionIndex < sampleData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === "previous" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="moody-question-container">
      <div className="question-header">
        <h2>{sampleData[currentQuestionIndex].question}</h2>
      </div>

      <div className="answer-grid">
        {sampleData[currentQuestionIndex].answers.map((answer) => (
          <button
            key={answer.id}
            className={`answer-option ${
              selectedAnswers[currentQuestionIndex] === answer.id
                ? "selected"
                : ""
            }`}
            onClick={() => handleAnswerSelect(answer.id)}
          >
            {answer.text}
          </button>
        ))}
      </div>

      <div className="navigation-controls">
        <button
          className="nav-button previous"
          onClick={() => handleNavigate("previous")}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className="nav-button next"
          onClick={() => handleNavigate("next")}
          disabled={
            selectedAnswers[currentQuestionIndex] === undefined ||
            selectedAnswers[currentQuestionIndex] === null
          }
        >
          Next
        </button>
      </div>

      <div className="progress">
        <p>
          Question {currentQuestionIndex + 1} of {sampleData.length}
        </p>
      </div>
    </div>
  );
};

export default Questions;
