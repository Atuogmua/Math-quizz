/*QuizzPage.js*/
import React, { useState } from 'react';
import QuizService from '../../services/QuizService';
import QuizQuestion from '../../components/QuizQuestion';
import Popup from '../../components/Popup';
import Timer from '../../components/Timer';
import Button from '../../components/Button/Button';
import QuestionNavigation from '../../components/QuestionNavigation/QuestionNavigation';
import ResourcePanel from '../../components/ResourcePanel/ResourcePanel'; // New component
import resourceData from '../../data/explanations.json'; // Assuming the file is in this path
import '../../styles/Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [menuHidden, setMenuHidden] = useState(true);
    const [score, setScore] = useState(0);
    const [showPopup, setShowPopup] = useState(true);
    const [quizFinished, setQuizFinished] = useState(false);
    const quizService = new QuizService();
    const quizList = quizService.getQuizList();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState(Array(quizList.length).fill(null)); // Array to track answers


    const initialQuizTime = 30 * 60;

    const handleTimeUp = () => {
        setQuizFinished(true);
    };

    const goToQuestion = (index) => {
        setCurrentQuestion(index);
        setCurrentResource(null); // Clear the resource panel when navigating to a different question

    };

    const toggleMenu = () => {
        setMenuHidden((prevState) => !prevState);
    };

    const handleAnswer = (selectedIndex) => {
        setSelectedAnswer(selectedIndex);
        setIsAnswered(true);
    };

    const submitAnswer = () => {
        if (selectedAnswer !== null) {
            const question = quizList[currentQuestion];
            const questionScore = question.scores[selectedAnswer];
            setScore((prevScore) => prevScore + questionScore);

            setAnsweredQuestions((prevState) => {
                const newState = [...prevState];
                newState[currentQuestion] = questionScore === 0 ? 'incorrect' : 'correct';
                return newState;
            });

            // Check if the answer is wrong and fetch the explanation
            if (questionScore === 0) {
                const explanationTitles = question.explanation; // Array of explanation titles
                const resources = explanationTitles.map((title) =>
                    resourceData.find((res) => res.title === title)
                ).filter(Boolean); // Filter out undefined if no match found

                if (resources.length > 0) {
                    setCurrentResource(resources[0]); // Show the first matching explanation
                } else {
                    setCurrentResource(null);
                }
            } else {
                setCurrentResource(null); // Clear resource if the answer is correct
            }

            // Handle navigation and state updates
            setSelectedAnswer(null);
            setIsAnswered(false);
            setShowCorrectAnswer(true);
            setTimeout(() => {
                setShowCorrectAnswer(false);
                setCurrentQuestion((prevQuestion) => {
                    if (prevQuestion + 1 < quizList.length) {
                        return prevQuestion + 1;
                    } else {
                        setQuizFinished(true);
                        return prevQuestion;
                    }
                });
            }, 1500);
        }
    };


    const handleCloseResource = () => {
        setCurrentResource(null); // Close the resource panel
    };

    const handleSkipQuestion = () => {
        if (currentQuestion < quizList.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setCurrentResource(null); // Hide the resource panel
        } else {
            setQuizFinished(true);
        }
    };


    const handleFinishQuiz = () => {
        setQuizFinished(true);
        setCurrentResource(null); // Hide the resource panel
    };


    const restartQuiz = () => {
        setCurrentQuestion(0); // Reset to the first question
        setScore(0);           // Reset the score
        setShowPopup(true);    // Show the initial popup again
        setQuizFinished(false); // Mark the quiz as not finished
        setAnsweredQuestions([]); // Clear the answered questions array
    };


    return (
        <div className="quiz-wrapper">
            {showPopup && (
                <Popup
                    onClose={() => setShowPopup(false)}
                    time="30 minutes"
                    totalQuestions={quizService.getTotalQuestions()}
                    rules="Answer each question within the time limit. To count the answer, press the Next button."
                />
            )}

            <div className={`quiz-container ${showPopup ? 'hidden' : 'visible'}`}>
                {!quizFinished && (
                    <Timer
                        initialTime={initialQuizTime}
                        onTimeUp={handleTimeUp}
                        isQuizFinished={quizFinished}
                    />
                )}

                <div className="quiz-content">
                    <ResourcePanel resource={currentResource} onClose={handleCloseResource} /> {/* Add resource panel here */}

                    <div className="quiz-question-wrapper">
                        {!quizFinished ? (
                            <QuizQuestion
                                question={quizList[currentQuestion]}
                                onAnswer={handleAnswer}
                                showCorrectAnswer={showCorrectAnswer}
                                isDisabled={answeredQuestions.includes(currentQuestion)} // Disable if already answered
                            />

                        ) : (
                            <div className="score-section">
                                <h2>Quiz Completed!</h2>
                                <p>Your Score: {score}</p>
                                <Button label="Restart Quiz" onClick={restartQuiz}>
                                    Restart Quiz
                                </Button>
                            </div>
                        )}
                    </div>

                    <QuestionNavigation
                        questions={quizList}
                        currentQuestion={currentQuestion}
                        goToQuestion={goToQuestion} // Pass the updated function
                        hidden={menuHidden}
                        toggleMenu={toggleMenu}
                        quizList={quizList}
                        quizFinished={quizFinished}
                        handleSkipQuestion={handleSkipQuestion}
                        handleFinishQuiz={handleFinishQuiz}
                        handleAnswer={submitAnswer}
                        isAnswered={isAnswered}
                        answeredQuestions = {answeredQuestions}
                    />

                </div>
            </div>
        </div>
    );

};

export default Quiz;