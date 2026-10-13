import { validateBriefing } from './briefings';
export const STORAGE_KEY = 'jber-airfield-study-v1';
export const emptyStudyState = () => ({ version: 1, remember: true, results: [], quizHistory: [], drafts: [] });
export function browserStorage() { try { return window.localStorage; } catch { return null; } }
export function readStudyState(storage = browserStorage()) {
  try {
    if (!storage) throw new Error('unavailable');
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { state: emptyStudyState(), warning: '' };
    const state = JSON.parse(raw);
    if (state.version !== 1 || typeof state.remember !== 'boolean' || !['results','quizHistory','drafts'].every(k => Array.isArray(state[k]))) throw new Error('invalid');
    if (!state.results.every(r => r && typeof r.id === 'string' && typeof r.moduleId === 'string' && typeof r.exerciseId === 'string' && typeof r.firstAttemptCorrect === 'boolean' && typeof r.completed === 'boolean' && Number.isFinite(Date.parse(r.completedAt)))) throw new Error('invalid result');
    if (!state.quizHistory.every(r => r && typeof r.id === 'string' && Number.isFinite(Date.parse(r.completedAt)) && Array.isArray(r.outcomes) && r.outcomes.every(o => Number.isInteger(o.questionId) && typeof o.category === 'string' && typeof o.correct === 'boolean'))) throw new Error('invalid quiz');
    if (!state.drafts.every(d => validateBriefing(d).length === 0)) throw new Error('invalid drafts');
    return { state: { version:1, remember:state.remember, results:state.results.slice(-500), quizHistory:state.quizHistory.slice(-100), drafts:state.drafts.slice(0,100) }, warning:'' };
  } catch { return { state: emptyStudyState(), warning: 'Saved progress could not be read. You can continue studying in this session.' }; }
}
export function writeStudyState(storage, state) {
  try { if (!storage) throw new Error('unavailable'); storage.setItem(STORAGE_KEY, JSON.stringify(state)); return { warning:'' }; }
  catch { return { warning:'Progress could not be saved on this device. This session still works; export briefing drafts before closing.' }; }
}
export const resultId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function addExercise(state, result) { return state.results.some(r => r.id === result.id) ? state : { ...state, results:[...state.results,result].slice(-500) }; }
export function addQuiz(state, result) { return state.quizHistory.some(r => r.id === result.id) ? state : { ...state, quizHistory:[...state.quizHistory,result].slice(-100) }; }
export function weakQuestionIds(state) {
  const latest = new Map(); state.quizHistory.forEach(r => r.outcomes.forEach(o => latest.set(o.questionId,o.correct)));
  return [...latest].filter(([,correct]) => !correct).map(([id]) => id);
}
