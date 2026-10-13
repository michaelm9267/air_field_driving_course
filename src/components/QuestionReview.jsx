import React from 'react';
export default function QuestionReview({ questions, selected, current, onSelect, flagged }) {
  return <nav className="question-grid" aria-label="Question navigation">{questions.map((q, index) => <button key={q.id} className={`question-number ${index === current ? 'current' : ''} ${selected[q.id] ? 'answered' : ''} ${flagged[q.id] ? 'flagged' : ''}`} aria-current={index === current ? 'step' : undefined} aria-label={`Go to question ${index + 1}${selected[q.id] ? ', answered' : ', unanswered'}${flagged[q.id] ? ', flagged' : ''}`} onClick={() => onSelect(index)}>{index + 1}</button>)}</nav>;
}
