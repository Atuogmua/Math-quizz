import React from 'react';
import './HeroSection.css';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();

    const startQuiz = () => {
        navigate('/quiz');
    };
    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to Math Quiz Master</h1>
                <p>Challenge yourself and sharpen your math skills in a fun and interactive way!</p>
            </div>
            <Button label="Start quizz" onClick={startQuiz}>Start Quiz</Button>
            <div className="hero-footer">
                <p>
                    <li>A test contains 100 questions</li>
                    <li>You have 30 minutes for each test</li>
                    <li>Take test to see your math level</li></p>
            </div>

        </div>

    );
}

export default HeroSection;