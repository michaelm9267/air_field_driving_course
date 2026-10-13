import React, { useState, useRef, useEffect } from 'react';
import questionsData from '../files/questions.json';
import answersData from '../files/answers.json';
import { categories, sources } from '../files/course';
import QuestionReview from './QuestionReview';
import ScoreSheet from './ScoreSheet';
import AirfieldMap from './AirfieldMap';
import Icon from './Icon';
import { resultId } from '../study/progress';

export default function QuestionBox({ testMode = false, questions = questionsData.questions, answers = answersData.answers, onExit, onComplete }) {
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [flagged, setFlagged] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const heading = useRef(null);
  const historyId = useRef(null);
  if (!historyId.current) historyId.current = resultId();
  const submittedOnce = useRef(false);
  const answerKeys = Object.fromEntries(answers.map(a => [a.id, a]));
  const q = activeQuestions[current];
  const answered = activeQuestions.filter(item => selected[item.id]).length;
  const flagCount = activeQuestions.filter(item => flagged[item.id]).length;
  useEffect(() => { heading.current?.focus(); }, [current, submitted, reviewing]);
  function restart() { historyId.current = resultId(); submittedOnce.current = false; setActiveQuestions(questions); setSelected({}); setFlagged({}); setCurrent(0); setSubmitted(false); setReviewing(false); }
  function review(missed) { historyId.current = resultId(); submittedOnce.current = false; setActiveQuestions(missed); setCurrent(0); setSelected({}); setFlagged({}); setSubmitted(false); setReviewing(true); }
  function submit() {
    if (submittedOnce.current || answered !== activeQuestions.length) return;
    submittedOnce.current = true;
    onComplete?.({ id: historyId.current, completedAt: new Date().toISOString(), testMode,
      outcomes: activeQuestions.map(item => ({ questionId: item.id, category: item['question-cat'], correct: selected[item.id] === answerKeys[item.id].correct_answer })) });
    setSubmitted(true);
  }
  if (!q) return <div className="panel"><h1>No questions available</h1><p>Select another topic to start a session.</p>{onExit && <button className="button primary" onClick={onExit}>Back to overview</button>}</div>;
  if (submitted) return <ScoreSheet questions={activeQuestions} selected={selected} answerKeys={answerKeys} onRestart={restart} onReview={review} testMode={testMode} />;
  const a = answerKeys[q.id];
  const feedback = !testMode || reviewing;
  const correct = selected[q.id] === a.correct_answer;
  const allAnswered = answered === activeQuestions.length;
  return <section className="quiz-section">
    <div className="session-heading"><div><span className="eyebrow">{reviewing ? 'MISSED QUESTION REVIEW' : testMode ? 'KNOWLEDGE CHECK' : 'GUIDED PRACTICE'}</span><h1>{reviewing ? 'A fresh look at what you missed.' : testMode ? 'Put your knowledge to work.' : 'Build confidence, one question at a time.'}</h1></div>{onExit && <button className="button quiet" onClick={onExit}><Icon name="back" /> Back to overview</button>}</div>
    <div className="quiz-layout"><div className="question-column">
      <div className="progress-header"><span>{answered} of {activeQuestions.length} answered</span><strong>{Math.round(answered / activeQuestions.length * 100)}%</strong></div><progress max={activeQuestions.length} value={answered} aria-label="Session progress" />
      <article className="panel question-card"><div className="question-meta"><span className="category-pill" data-testid="question-category"><Icon name={categories[q['question-cat']].icon} />{categories[q['question-cat']].label}</span><button className={`flag-button ${flagged[q.id] ? 'is-flagged' : ''}`} aria-pressed={Boolean(flagged[q.id])} onClick={() => setFlagged(prev => ({ ...prev, [q.id]: !prev[q.id] }))}><Icon name="flag" />{flagged[q.id] ? 'Flagged' : 'Flag for review'}</button></div>
        <h2 className="question-counter" ref={heading} tabIndex="-1">Question {current + 1} <span>/ {activeQuestions.length}</span></h2><p className="question-text">{q.question}</p>
        {q.map && <AirfieldMap compact />}
        <div className="answer-options" aria-label="Answer choices">{q.options.map((opt, index) => {
          const chosen = selected[q.id] === opt.id;
          const style = chosen ? feedback ? correct ? 'correct' : 'incorrect' : 'selected' : '';
          return <button key={opt.id} className={`answer-button ${style}`} aria-pressed={chosen} onClick={() => setSelected(prev => ({ ...prev, [q.id]: opt.id }))}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{opt.option}</span>{chosen && <Icon name={feedback ? correct ? 'check' : 'close' : 'check'} />}</button>;
        })}</div>
        {selected[q.id] && feedback && <div className={`feedback ${correct ? 'feedback-correct' : 'feedback-incorrect'}`} role="status"><Icon name={correct ? 'check' : 'book'} /><div><strong>{correct ? 'Correct. Nicely done.' : 'Not quite. Here’s the reasoning.'}</strong>{!correct && <p><b>Correct answer:</b> {q.options.find(o => o.id === a.correct_answer)?.option}</p>}<p>{a.explanation}</p><a className="citation" href={sources[a.source || 'dafi'].url} target="_blank" rel="noreferrer">{a.ref} <Icon name="external" /></a></div></div>}
        <div className="question-actions"><button className="button secondary" disabled={current === 0} onClick={() => setCurrent(n => n - 1)}><Icon name="back" /> Previous question</button>{current < activeQuestions.length - 1 ? <button className="button primary" onClick={() => setCurrent(n => n + 1)}>Next question <Icon name="arrow" /></button> : <button className="button primary" disabled={!allAnswered} onClick={submit}>Finish session <Icon name="check" /></button>}</div>
      </article><p className="quiz-footnote">{feedback ? 'Choose an answer to see the explanation. You can change it as you learn.' : 'Answers and references stay hidden until you finish. You can revisit any question.'}</p>
    </div><aside className="quiz-sidebar panel"><div className="sidebar-heading"><h2>Your session</h2><span>{activeQuestions.length} QUESTIONS</span></div><QuestionReview questions={activeQuestions} selected={selected} current={current} onSelect={setCurrent} flagged={flagged} /><div className="question-legend"><span><i className="legend-current" /> Current</span><span><i className="legend-answered" /> Answered</span><span><i className="legend-flagged" /> Flagged</span></div><div className="sidebar-divider" /><p>{activeQuestions.length - answered} unanswered{flagCount > 0 ? ` · ${flagCount} flagged` : ''}</p>{!allAnswered && <button className="text-link unanswered-link" onClick={() => setCurrent(activeQuestions.findIndex(item => !selected[item.id]))}>Go to next unanswered <Icon name="arrow" /></button>}{current !== activeQuestions.length - 1 && <button className="button primary finish-button" disabled={!allAnswered} onClick={submit}>Finish session <Icon name="check" /></button>}<small>Answer every question before finishing. Flags are reminders and do not affect your score.</small><div className="sidebar-note"><Icon name="shield" /><p>Practice session only.<br />Certification stays with your ADPM.</p></div></aside></div>
  </section>;
}
