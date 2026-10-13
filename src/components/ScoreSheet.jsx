import React, { useRef, useEffect } from 'react';
import { categories, sources } from '../files/course';
import Icon from './Icon';
export default function ScoreSheet({ questions, selected, answerKeys, onReview, onRestart, testMode }) {
  const resultsHeading = useRef(null);
  useEffect(() => { resultsHeading.current?.focus(); }, []);
  const correct = questions.filter(q => selected[q.id] === answerKeys[q.id].correct_answer);
  const missed = questions.filter(q => selected[q.id] !== answerKeys[q.id].correct_answer);
  const percent = Math.round(correct.length / questions.length * 100);
  const complete = missed.length === 0;
  return <section className="results-section" aria-labelledby="results-heading">
    <div className={`result-hero panel ${complete ? 'complete' : ''}`}><span className="result-icon"><Icon name={complete ? 'check' : 'book'} /></span><span className="eyebrow">{testMode ? 'KNOWLEDGE CHECK' : 'PRACTICE'} RESULTS</span><h1 id="results-heading" ref={resultsHeading} tabIndex="-1">{complete ? 'Session complete.' : 'Keep learning.'}</h1><p>{complete ? 'Every answer is correct. Keep this knowledge fresh before your next airfield operation.' : 'You’ve found the areas to focus on. Review the explanations, then try the missed questions again.'}</p><div className="result-numbers"><strong>{percent}<span>%</span></strong><div>{correct.length} of {questions.length} correct<small>{missed.length} to review</small></div></div><div className="result-actions">{!complete && <button className="button primary" onClick={() => onReview(missed)}>Review missed questions <Icon name="arrow" /></button>}<button className="button secondary" onClick={onRestart}><Icon name="reset" /> Try session again</button><button className="button quiet" onClick={() => window.print()}>Print results</button></div></div>
    <div className="panel result-breakdown"><h2>Your topic breakdown</h2><div className="table-scroll"><table><thead><tr><th>Topic</th><th>Correct</th><th>Score</th><th>Learning status</th></tr></thead><tbody>{Object.entries(categories).map(([key, cat]) => {
      const group = questions.filter(q => q['question-cat'] === key); if (!group.length) return null;
      const totalCorrect = group.filter(q => selected[q.id] === answerKeys[q.id].correct_answer).length;
      // Use raw counts for threshold decisions; rounded display must never turn a failure into a pass.
      const minimumMet = totalCorrect / group.length >= (key === 'general' ? 0.8 : 1);
      const allCorrect = totalCorrect === group.length;
      return <tr key={key}><th scope="row">{cat.label}</th><td>{totalCorrect} / {group.length}</td><td>{Math.round(totalCorrect / group.length * 100)}%</td><td><span className={`result-status ${allCorrect ? 'good' : 'needs-review'}`}>{allCorrect ? 'All correct' : minimumMet ? 'Minimum met · correction required' : 'Review needed'}</span></td></tr>;
    })}</tbody></table></div><p className="result-policy">General knowledge: 80% minimum, corrected to 100%. Other sections: 100%. A fully correct practice session does not establish completion of official testing, practical training, or certification.</p><small>DAFGM2026-01, 3.4.1; 3 WG supplement, 3.6.3.</small></div>
    {missed.length > 0 && <section className="missed-section"><h2>Learn from your missed answers</h2>{missed.map((q, i) => { const a = answerKeys[q.id]; return <article className="panel missed-card" key={q.id}><span className="eyebrow">{categories[q['question-cat']].label} · REVIEW {i + 1}</span><h3>{q.question}</h3><p className="your-answer">Your answer: {q.options.find(o => o.id === selected[q.id])?.option || 'Unanswered'}</p><p className="correct-answer"><Icon name="check" /> Correct answer: {q.options.find(o => o.id === a.correct_answer)?.option}</p><p>{a.explanation}</p><a href={sources[a.source || 'dafi'].url} target="_blank" rel="noreferrer" className="citation">{a.ref} <Icon name="external" /></a></article>; })}</section>}
  </section>;
}
