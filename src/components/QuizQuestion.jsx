/*QuizQuestion.jsx*/
import React, { useEffect, useState } from 'react';
import '../styles/QuizQuestion.css';

const QuizQuestion = ({ question, onAnswer, showCorrectAnswer, isDisabled }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Reset state whenever a new question is passed in
    useEffect(() => {
        setSelectedAnswer(null);
        setIsAnswered(false);
    }, [question]);

    const handleAnswerClick = (index) => {
        if (isAnswered) return; // Prevent multiple clicks

        setSelectedAnswer(index);
        setIsAnswered(true);
        onAnswer(index); // Notify parent component
    };

    const getButtonColor = (index) => {
        if (showCorrectAnswer) {
            return question.scores[index] === 1 ? 'correct' : 'incorrect';
        }
        if (!isAnswered) return selectedAnswer === index ? 'selected' : ''; // Apply 'selected' class only to the selected button
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