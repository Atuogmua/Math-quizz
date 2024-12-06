import React from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import './QuestionNavigation.css';

const QuestionNavigation = ({
                                questions,
                                currentQuestion,
                                goToQuestion,
                                hidden,
                                toggleMenu,
                                quizList,
                                quizFinished,
                                handleSkipQuestion,
                                handleFinishQuiz,
                                handleAnswer,
                                isAnswered
                            }) => {
    return (
        <div className={`question-navigation ${hidden ? 'hidden' : ''}`}>
            <div className="button-wrapper">
                <button className="toggle-button" onClick={toggleMenu}>
                    {hidden ? 'Show Menu' : 'Hide Menu'}
                </button>
                {!hidden && (
                    <div className="grid-container">
                        {questions.map((_, index) => (
                            <div
                                key={index}
                                className={`grid-item ${index === currentQuestion ? 'active' : ''} ${index > currentQuestion ? 'disabled' : ''}`}
                                onClick={() => {
                                    if (index <= currentQuestion) {
                                        goToQuestion(index);
                                    }
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Button
                label="Next"
                onClick={() => handleAnswer()} // Call `handleAnswer` on click
                disabled={!isAnswered} // Disable until an answer is selected
            />
            <Button
                label="Skip"
                onClick={() => handleSkipQuestion()}
                disabled={currentQuestion >= quizList.length - 1 || quizFinished}
            />
            <Button
                label="Finish Quiz"
                onClick={() => handleFinishQuiz()}
            />
        </div>
    );
};

QuestionNavigation.propTypes = {
    questions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    goToQuestion: PropTypes.func.isRequired,
    hidden: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    quizList: PropTypes.array.isRequired,
    quizFinished: PropTypes.bool.isRequired,
    handleSkipQuestion: PropTypes.func.isRequired,
    handleFinishQuiz: PropTypes.func.isRequired,
    handleAnswer: PropTypes.func.isRequired,
    isAnswered: PropTypes.bool.isRequired,
};

export default QuestionNavigation;
