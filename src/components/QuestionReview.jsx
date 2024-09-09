import React from "react";

const QuestionReview = ({ results, onQuestionClick, shuffledQuestions, num }) => {
  return (
    <div className="QR-Container">
      {shuffledQuestions.map((q, index) => {
        const questionNumber = index + 1;
        
        // Check if the current question is active
        const isActive = num === questionNumber;

        // Check if the current question exists in the results array
        const isAnswered = results.some((result) => result.questionId === q.id);

        // Apply conditional styling
        const answeredStyle = {
          backgroundColor: isActive ? "black" : isAnswered ? "blue" : "white",
          color: isActive || isAnswered ? "white" : "black",
          cursor: "pointer",
        };

        return (
          <div key={q.id} className="QRquestion">
            <p
              className="QR-number"
              style={answeredStyle}
              onClick={() => onQuestionClick(questionNumber)}
            >
              {questionNumber}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionReview;
