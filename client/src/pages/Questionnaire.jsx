import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mood = location.state?.mood;

  console.log(`Mood is ${mood}`);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://moody-be.onrender.com/generate-questions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mood: mood }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(""));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [mood]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/generate-activities", {
        state: {
          answers,
          questions,
          mood,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-lg animate-fadeIn">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-100" />
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200" />
        </div>
        <p className="text-center mt-4 text-indigo-600">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-lg animate-fadeIn">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-4">Error loading questions</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="max-w-2xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-lg animate-fadeIn">
        <p className="text-center text-indigo-600">No questions available</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto my-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p className="text-xl mb-6 text-indigo-700">
          {questions[currentQuestion].question}
        </p>
        <div className="space-y-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <div key={`${option}-${index}`} className="flex items-center">
              <input
                type="radio"
                id={`${option}-${index}`}
                name="answer"
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswer(option)}
                className="hidden"
              />
              <label
                htmlFor={`${option}-${index}`}
                className={`flex-1 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                  answers[currentQuestion] === option
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? "bg-indigo-600"
                    : answers[index]
                    ? "bg-indigo-300"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Questionnaire;
