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
    const [menuHidden, setMenuHidden] = useState(true); // State to manage menu visibility
    const [score, setScore] = useState(0);
    const [showPopup, setShowPopup] = useState(true);
    const [quizFinished, setQuizFinished] = useState(false);
    const quizService = new QuizService();
    const quizList = quizService.getQuizList();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);




    const initialQuizTime = 30 * 60;

    const handleTimeUp = () => {
        setQuizFinished(true);
    };

    const goToQuestion = (index) => {
        setCurrentQuestion(index);
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

            // If the answer is wrong, set the resource data
            if (questionScore === 0) {
                const skillLevel = question.skill_level;
                const resource = resourceData.find((res) => res.skill_level === skillLevel);
                setCurrentResource(resource);
            } else {
                setCurrentResource(null); // Clear resource if correct
            }
        }

        // Show correct answer for 2 seconds
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

            setSelectedAnswer(null);
            setIsAnswered(false);
        }, 1500);
    };



    const handleSkipQuestion = () => {
        if (currentQuestion < quizList.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleFinishQuiz = () => {
        setQuizFinished(true);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowPopup(true);
        setQuizFinished(false);
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
                    <ResourcePanel resource={currentResource} /> {/* Add resource panel here */}

                    <div className="quiz-question-wrapper">
                        {!quizFinished ? (
                            <QuizQuestion
                                question={quizList[currentQuestion]}
                                onAnswer={handleAnswer}
                                showCorrectAnswer={showCorrectAnswer}
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
                        goToQuestion={goToQuestion}
                        hidden={menuHidden}
                        toggleMenu={toggleMenu}
                        quizList={quizList}
                        quizFinished={quizFinished}
                        handleSkipQuestion={handleSkipQuestion}
                        handleFinishQuiz={handleFinishQuiz}
                        handleAnswer={submitAnswer}
                        isAnswered={isAnswered}
                    />
                </div>
            </div>
        </div>
    );

};

export default Quiz;