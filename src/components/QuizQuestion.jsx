/*QuizQuestion.jsx*/
import React, { useEffect, useState } from 'react';
import '../styles/QuizQuestion.css';
import Button from "./Button/Button";

const QuizQuestion = ({ question, onAnswer, showCorrectAnswer, isDisabled }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Reset state whenever a new question is passed in
    useEffect(() => {
        setSelectedAnswer(null);
        setIsAnswered(false);
    }, [question]);

    useEffect(() => {
        console.log("Selected answer:", selectedAnswer);
    }, [selectedAnswer]);


    const handleAnswerClick = (index) => {
        if (isAnswered) return; // Prevent multiple clicks
        console.log("Selected index:", index); // Debug log
        setSelectedAnswer(index);
        setIsAnswered(true);
        onAnswer(index); // Notify parent component
    };


    const getButtonColor = (index) => {
        if (showCorrectAnswer) {
            return question.scores[index] === 1 ? 'correct' : 'incorrect';
        }
        console.log("Button index:", index, "Selected answer:", selectedAnswer);
        if (!isAnswered && selectedAnswer === index) return 'selected';
        return selectedAnswer === index
            ? question.scores[index] === 1
                ? 'correct'
                : 'incorrect'
            : '';
    };


    return (
        <div className="quiz-question">
            <h2>{question.question}</h2>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-button ${getButtonColor(index)}`}
                        onClick={() => handleAnswerClick(index)}
                        disabled={isAnswered || showCorrectAnswer||isDisabled} // Disable during correct answer display
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default QuizQuestion;