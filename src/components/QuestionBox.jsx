import React, { useState, useEffect } from 'react'
import questions from "../files/questions.json"
import answers from "../files/answers.json"
import map from "../images/map.png"

const QuestionBox = () => {
    const [num, setNum] = useState(null); // Tracks current question
    const [selectedOptionId, setSelectedOptionId] = useState(null); // Tracks selected option ID
    const [isCorrect, setIsCorrect] = useState(null); // Tracks if the selected option is correct
    const [history, setHistory] = useState([]); // Array to store the history of shown questions
    const [currentIndex, setCurrentIndex] = useState(-1); // Tracks the current index in the history
    const [results, setResults] = useState([]); // Array to track correct/incorrect answers
    const [shuffledOptions, setShuffledOptions] = useState([]); // Tracks shuffled options
    const [questionNumber, setQuestionNumber] = useState(0); // Tracks the question number

    // Shuffle function to randomize the order of options
    const shuffleArray = (array) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    // Click handler to check answers
    const clickHandler = (questionId, selectedOptionId) => {
        const correctAnswer = answers.answers.find(answer => answer.id === questionId)?.correct_answer;

        if (correctAnswer) {
            const isAnswerCorrect = selectedOptionId === correctAnswer;
            setIsCorrect(isAnswerCorrect); // Set correctness
            // Update the results array with correct or incorrect
            setResults(prevResults => {
                const updatedResults = [...prevResults];
                updatedResults[questionId - 1] = isAnswerCorrect ? 'correct' : 'incorrect'; // Store 'correct' or 'incorrect'
                return updatedResults;
            });
        }

        setSelectedOptionId(selectedOptionId); // Store the selected option ID
    };

    // Generate a random number that is not in the history
    const generateRandomNum = () => {
        let randomNum;
        const availableQuestions = questions.questions.filter(q => !history.includes(q.id));
        if (availableQuestions.length === 0) {
            return null; // If all questions have been shown
        }

        randomNum = availableQuestions[Math.floor(Math.random() * availableQuestions.length)].id;
        return randomNum;
    };

    // Handle the "Next" button click to go to a new random question
    const handleNext = () => {
        const nextQuestionNum = generateRandomNum();
        if (nextQuestionNum !== null) {
            // Add the new question to the history
            const newHistory = [...history.slice(0, currentIndex + 1), nextQuestionNum];
            setHistory(newHistory);
            setCurrentIndex(currentIndex + 1);
            setNum(nextQuestionNum);
            setSelectedOptionId(null); // Reset selected option
            setIsCorrect(null); // Reset correctness
            setQuestionNumber(questionNumber + 1); // Increment the question number

            // Shuffle the options for the new question
            const question = questions.questions.find(q => q.id === nextQuestionNum);
            if (question) {
                setShuffledOptions(shuffleArray(question.options));
            }
        } else {
            alert("All questions have been shown.");
        }
    };

    // Handle the "Previous" button click to go back in history
    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevQuestionNum = history[currentIndex - 1];
            setNum(prevQuestionNum);
            setCurrentIndex(currentIndex - 1);
            setSelectedOptionId(null); // Reset selected option
            setIsCorrect(null); // Reset correctness
            setQuestionNumber(questionNumber - 1); // Decrement the question number

            // Shuffle the options for the previous question
            const question = questions.questions.find(q => q.id === prevQuestionNum);
            if (question) {
                setShuffledOptions(shuffleArray(question.options));
            }
        }
    };

    // Render the boxes representing the question status
    const renderResults = () => {
        return questions.questions.map((q, index) => {
            const status = results[index];
            const backgroundColor = status === 'correct' ? 'green' : status === 'incorrect' ? 'red' : 'gray';
            return (
                <div key={q.id} style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    margin: '5px',
                    backgroundColor: backgroundColor,
                    textAlign: 'center',
                    lineHeight: '20px',
                    color: 'white',
                    borderRadius: '50%'
                }}>
                    {q.id}
                </div>
            );
        });
    };

    // Shuffle the options when a new question is loaded
    useEffect(() => {
        if (num !== null) {
            const question = questions.questions.find(q => q.id === num);
            if (question) {
                setShuffledOptions(shuffleArray(question.options));
            }
        }
    }, [num]);

    return (
        <div className='main-cont'>
            <div className='border-container'>
                {questions.questions.map((pic) => {
                    if (num === pic.id && pic.map) {
                        return <img src={map} alt='map' className='map' key={pic.id} />
                    }
                })}

                <div className='question-cont'>
                    
                    <p><span className='question-number'>{questionNumber}/{questions.questions.length + 1} </span> {questions.questions.map((q) => {
                        if (num === q.id) {
                            return q.question;
                        }
                    })}</p>
                </div>

                <div className='answer-cont'>
                    {shuffledOptions.map((ans) => {
                        const isSelected = selectedOptionId === ans.id;

                        // Apply conditional styling based on correctness
                        const buttonStyle = isSelected
                            ? { backgroundColor: isCorrect ? 'green' : 'red' }
                            : {};

                        return (
                            <button
                                onClick={() => clickHandler(num, ans.id)}
                                className='answer-button'
                                key={ans.id}
                                style={buttonStyle}
                            >
                                {ans.option}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='navigation-buttons'>
                <button onClick={handlePrevious} disabled={currentIndex <= 0}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default QuestionBox;
