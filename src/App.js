import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import QuestionBox from './components/QuestionBox';
import Resources from './components/Resources';
import Icon from './components/Icon';
import { categories } from './files/course';
import questionsData from './files/questions.json';
import TrainingHub from './components/TrainingHub';
import StudyProgress from './components/StudyProgress';
import LocalBriefing from './components/LocalBriefing';
import useStudyProgress from './study/useStudyProgress';

export default function App() {
  const [page, setPage] = useState('home');
  const [moduleId, setModuleId] = useState(null);
  const [trainingVisited, setTrainingVisited] = useState(false);
  const [briefingVisited, setBriefingVisited] = useState(false);
  const progress = useStudyProgress();
  useEffect(() => { const heading = document.getElementById('main-content')?.querySelector('h1'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }, [page,moduleId]);
  const [topic, setTopic] = useState('all');
  const [session, setSession] = useState(null);
  const [sessionNumber, setSessionNumber] = useState(0);
  function navigate(next) { if (next === 'training') setTrainingVisited(true); if (next === 'briefing') setBriefingVisited(true); setPage(next); window.scrollTo?.(0, 0); }
  function start(testMode, customQuestions = null) {
    const questions = customQuestions || questionsData.questions.filter(q => topic === 'all' || q['question-cat'] === topic);
    // Fisher–Yates avoids the bias of sorting with a random comparator.
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    setSession({ testMode, questions: shuffled }); setSessionNumber(n => n + 1); navigate('session');
  }
  function openModule(id) { if (id === 'quiz') { start(false, questionsData.questions); return; } setModuleId(id); navigate('training'); }
  function reviewQuestions(ids) { const selected = questionsData.questions.filter(q => ids.includes(q.id)); if (selected.length) start(false, selected); }
  const selectedCount = questionsData.questions.filter(q => topic === 'all' || q['question-cat'] === topic).length;
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header page={page} onNavigate={navigate} sessionActive={Boolean(session)} />
    {page === 'home' && <main id="main-content" className="page home-page">
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><span className="tiny-line" /> 3 WING / JOINT BASE ELMENDORF–RICHARDSON</span><h1>Confidence starts<br />before the <span>hold line.</span></h1><p>Build your airfield driving knowledge with focused practice, clear explanations, and procedures specific to Elmendorf.</p><div className="hero-actions"><button className="button primary" onClick={() => start(false)}>Start practice <Icon name="arrow" /></button><button className="button hero-secondary" onClick={() => navigate('resources')}><Icon name="map" /> Explore the airfield</button></div><span className="hero-footnote"><Icon name="shield" /> A study companion for safer airfield operations</span></div>
        <div className="hero-visual" aria-hidden="true"><div className="visual-coordinate">61°15′ N &nbsp; 149°48′ W</div><div className="runway runway-main"><span>06</span><div className="runway-center" /><span>24</span></div><div className="runway runway-cross"><span>16</span><div className="runway-center" /><span>34</span></div><div className="taxiway-line" /><div className="hold-line" /><span className="hold-label">STOP. READ BACK. PROCEED.</span><div className="visual-badge"><span className="status-dot" /> ELMENDORF AIRFIELD <small>PAED / JBER</small></div><span className="visual-caption">ILLUSTRATION · NOT FOR NAVIGATION</span></div>
      </section>
      <section className="course-stats" aria-label="Course overview"><div><Icon name="book" /><span><strong>{questionsData.questions.length} questions</strong><small>Every answer explained</small></span></div><div><Icon name="shield" /><span><strong>4 focus areas</strong><small>Local knowledge. Safer decisions.</small></span></div><div><Icon name="clock" /><span><strong>Go at your pace</strong><small>No timer. No sign-up.</small></span></div><div><Icon name="map" /><span><strong>3 WG + JBER</strong><small>Elmendorf-specific practice</small></span></div></section>
      <section className="home-training-launch panel"><span className="topic-icon"><Icon name="shield" /></span><div><span className="eyebrow">NEW: THE TRAINING LAB</span><h2>Turn knowledge into better decisions.</h2><p>Scenarios, radio practice, map drills, signals, and winter operations — with personal study progress.</p></div><button className="button primary" onClick={() => navigate('training')}>Open training lab <Icon name="arrow" /></button></section>
      <section className="start-section"><div className="section-heading"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Make your next session count.</h2></div><span className="section-subtitle">A little practice. A lot more confidence.</span></div>
        <div className="session-grid"><div className="session-options panel"><label htmlFor="practice-topic">Practice topic</label><select id="practice-topic" value={topic} onChange={e => setTopic(e.target.value)}><option value="all">All topics · {questionsData.questions.length} questions</option>{Object.entries(categories).map(([key, cat]) => <option key={key} value={key}>{cat.label} · {questionsData.questions.filter(q => q['question-cat'] === key).length}</option>)}</select><p>Focus on one area or work through the complete question bank.</p><div className="mode-card"><span className="mode-icon"><Icon name="book" /></span><div><h3>Practice mode</h3><p>Learn as you go with instant feedback and references.</p></div><button className="button primary" onClick={() => start(false)}>Practice <Icon name="arrow" /></button></div><div className="mode-card"><span className="mode-icon secondary-icon"><Icon name="shield" /></span><div><h3>Knowledge check</h3><p>Keep answers hidden until you finish, then review what you missed.</p></div><button className="button secondary" onClick={() => start(true)}>Begin check <Icon name="arrow" /></button></div><small className="session-count">{selectedCount} questions in your selected session · Practice only</small>{session && <button className="resume-link" onClick={() => navigate('session')}>Resume your current session <Icon name="arrow" /></button>}</div>
        <aside className="local-brief"><span className="eyebrow">THE LOCAL BRIEF</span><h3>Same mission.<br />Your airfield.</h3><p>Study the hold positions, radio procedures, and winter operating conditions you’ll encounter at Elmendorf.</p><div className="brief-divider" /><strong>Built from your publications</strong><p className="brief-source">DAFI 13-213 + 30 Sep 2026 guidance<br />3 WG supplement · Current 19 Feb 2026</p><button onClick={() => navigate('resources')}>Open reference desk <Icon name="external" /></button></aside></div>
      </section>
      <section className="topics-section"><div className="section-heading"><h2>Four areas. One safer driver.</h2><span>WHAT YOU’LL PRACTICE</span></div><div className="topic-grid">{Object.entries(categories).map(([key, cat]) => <button className={`topic-card ${topic === key ? 'topic-selected' : ''}`} key={key} aria-pressed={topic === key} onClick={() => setTopic(key)}><span className="topic-icon"><Icon name={cat.icon} /></span><span className="topic-count">{questionsData.questions.filter(q => q['question-cat'] === key).length} questions</span><h3>{cat.label}</h3><p>{cat.description}</p><span className="text-link">Focus on this topic <Icon name="arrow" /></span></button>)}</div></section>
      <div className="training-strip"><Icon name="shield" /><p><strong>Practice here. Certify through your ADPM.</strong> This study aid does not replace official ADTCS training, local familiarization, or driving certification.</p><button onClick={() => navigate('resources')}>Training requirements <Icon name="arrow" /></button></div>
    </main>}
    {page === 'resources' && <Resources />}
    {trainingVisited && <div hidden={page !== 'training'}><TrainingHub moduleId={moduleId} onOpenModule={openModule} onBack={() => setModuleId(null)} onResult={progress.recordExercise} active={page === 'training'} /></div>}
    {page === 'progress' && <StudyProgress progress={progress} onReviewQuestions={reviewQuestions} onOpenModule={openModule} />}
    {briefingVisited && <div hidden={page !== 'briefing'}><LocalBriefing drafts={progress.state.drafts} onSaveDrafts={progress.saveDrafts} storageWarning={progress.warning || (!progress.state.remember ? 'Device memory is off. Export drafts to keep them after this session.' : '')} active={page === 'briefing'} /></div>}
    {session && <div hidden={page !== 'session'}><main id={page === 'session' ? 'main-content' : undefined} className="page session-page"><QuestionBox key={sessionNumber} testMode={session.testMode} questions={session.questions} onExit={() => navigate('home')} onComplete={progress.recordQuiz} /></main></div>}
    <footer className="site-footer"><span><Icon name="plane" /> 3 WG / JBER · Airfield driving study companion</span><span>Source review: 12 Oct 2026 <span className="footer-divider">/</span> Practice, not certification</span></footer>
  </div>;
}
