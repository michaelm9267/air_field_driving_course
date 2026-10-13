import { readStudyState, writeStudyState, addExercise, addQuiz, weakQuestionIds } from './progress';
const emptyStorage = () => ({ getItem: () => null, setItem: jest.fn() });
const event = { id: 'a', moduleId: 'scenarios', exerciseId: 'radio-failure', correct: false, firstAttemptCorrect: false, completed: true, completedAt: '2026-10-12T12:00:00Z' };
test('unreadable or obsolete saved progress falls back to usable memory', () => {
  for (const storage of [{ getItem: () => '{' }, { getItem: () => JSON.stringify({ version: 4 }) }, { getItem: () => { throw new Error('blocked'); } }]) {
    const result = readStudyState(storage);
    expect(result.state.results).toEqual([]); expect(result.warning).toBeTruthy();
  }
});
test('quota errors are returned without throwing', () => {
  const state = readStudyState(emptyStorage()).state;
  expect(writeStudyState({ setItem: () => { throw new Error('quota'); } }, state).warning).toBeTruthy();
});
test('exercise events preserve a failed first attempt and deduplicate IDs', () => {
  const state = readStudyState(emptyStorage()).state;
  const next = addExercise(addExercise(state, event), event);
  expect(next.results).toHaveLength(1); expect(next.results[0].completed).toBe(true); expect(next.results[0].firstAttemptCorrect).toBe(false);
});
test('quiz review clears a corrected weak item without removing history', () => {
  let state = readStudyState(emptyStorage()).state;
  state = addQuiz(state, { id:'q1', completedAt:event.completedAt, outcomes:[{questionId:1,category:'general',correct:false}] });
  expect(weakQuestionIds(state)).toEqual([1]);
  state = addQuiz(state, { id:'q2', completedAt:event.completedAt, outcomes:[{questionId:1,category:'general',correct:true}] });
  expect(weakQuestionIds(state)).toEqual([]); expect(state.quizHistory).toHaveLength(2);
  expect(addQuiz(state, state.quizHistory[1]).quizHistory).toHaveLength(2);
});
