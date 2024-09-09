import React, { useState, useEffect } from 'react';
import questionsData from '../files/questions.json';
import answers from '../files/answers.json';
import map from '../images/map.png';
import QuestionReview from './QuestionReview';
import InfoInput from './InfoInput';
import ScoreSheet from './ScoreSheet';

const QuestionBox = ({testMode}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [num, setNum] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [results, setResults] = useState([]);
  const [categoryScores, setCategoryScores] = useState({});
  const [memberInfo, setMemberInfo] = useState({ name: '', rank: '', unit: '' });
  const [modalOpen, setModalOpen] = useState(true);
  const [scoreSheetModalOpen, setScoreSheetModalOpen] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Shuffle questions once when component mounts
  useEffect(() => {
    
    setShuffledQuestions([...questionsData.questions].sort(() => Math.random() - 0.5));
  }, []);

  // Function to handle option selection
  const handleOptionClick = (q, opt) => {
    const correctAnswer = answers.answers.find((answer) => answer.id === q.id)?.correct_answer;
    
    setSelectedOptions((prev) => ({ ...prev, [num]: opt.id }));

    // Update results for correct/incorrect answers
    setResults((prev) => {
      const updatedResults = [...prev];
      const resultIndex = updatedResults.findIndex((r) => r.questionId === q.id);

      if (resultIndex === -1) {
        updatedResults.push({
          questionId: q.id,
          categoty: q['question-cat'],
          result: opt.id === correctAnswer ? 'correct' : 'incorrect',
        });
      } else {
        updatedResults[resultIndex].result = opt.id === correctAnswer ? 'correct' : 'incorrect';
      }

      setIsCorrect(opt.id === correctAnswer);
      return updatedResults;
    });
  };

  const handleNext = () => {
    if (num < shuffledQuestions.length) {
      setNum((prev) => prev + 1);
      setQuestionNumber((prev) => prev + 1);
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (num > 1) {
      setNum((prev) => prev - 1);
      setQuestionNumber((prev) => prev - 1);
      setIsCorrect(null);
    }
  };

  const handleSubmit = () => {
    setScoreSheetModalOpen(true);
  };

  const renderQuestionOptions = (q) => {
    return q.options.map((opt) => {
      const correctAnswer = answers.answers.find((answer) => answer.id === q.id)?.correct_answer;
      const isSelected = selectedOptions[num] === opt.id;
      const buttonStyle = !testMode && isSelected ? { backgroundColor: opt.id === correctAnswer ? 'green' : 'red' } : testMode && isSelected ? {backgroundColor: "#36454F", color: "white"}: {}

      return (
        <button
          key={opt.id}
          style={buttonStyle}
          className='answer-button'
          onClick={() => handleOptionClick(q, opt)}
        >
          {opt.option}
        </button>
      );
    });
  };

  const renderQuestion = (q, index) => {
    if (num !== index + 1) return null;

    return (
      <div key={q.id}>
        <p>{q.question}</p>
        <div className='answer-cont'>{renderQuestionOptions(q)}</div>
      </div>
    );
  };

  return (
    <div className='main-cont'>
      {modalOpen && <InfoInput setMemberInfo={setMemberInfo} setModalOpen={setModalOpen} memberInfo={memberInfo} />}

      <QuestionReview results={results} onQuestionClick={setNum} shuffledQuestions={shuffledQuestions} num={num} />

          <span className='question-number'>{num}/{questionsData.questions.length}</span>
      <div className='border-container'>
        {shuffledQuestions.map((pic, index) =>
          num === index + 1 && pic.map ? <img src={map} alt='map' className='map' key={pic.id} /> : null
        )}

        <div className='question-cont'>
          {shuffledQuestions.map(renderQuestion)}
        </div>
      </div>

      <div className='navigation-buttons'>
        <button onClick={handlePrevious} disabled={num <= 1}>Previous</button>
        <button onClick={num !== shuffledQuestions.length ? handleNext : handleSubmit}  disabled={num === shuffledQuestions.length && results.length !== shuffledQuestions.length}
  >
          {num >= shuffledQuestions.length ? "Submit" : "Next"}
        </button>
      </div>
      {scoreSheetModalOpen && <ScoreSheet memberInfo={memberInfo} results={results} setCategoryScores={setCategoryScores} categoryScores={categoryScores} setScoreSheetModalOpen={setScoreSheetModalOpen} />}
    </div>
  );
};

export default QuestionBox;
