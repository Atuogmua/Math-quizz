/*QuizService.js*/
import QuizModel from '../models/QuizModel';
import quizData from '../data/quiz.json';

class QuizService {
    constructor(maxQuestions = 100) {

        const limitedQuizData = quizData.slice(0, maxQuestions);

        this.quizList = limitedQuizData.map(q => new QuizModel(
            q.question,
            q.options,
            q.scores,
            q.totalScore,
            q.skill_level,
            q.challenge_level,
            q.explanation
        ));
    }

    getQuizList() {
        return this.quizList;
    }

    getTotalQuestions() {
        return this.quizList.length;
    }

    /*shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }*/
}

export default QuizService;
