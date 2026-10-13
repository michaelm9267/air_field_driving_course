import { useCallback, useEffect, useState } from 'react';
import { readStudyState, writeStudyState, browserStorage, emptyStudyState, addExercise, addQuiz } from './progress';
export default function useStudyProgress() {
  const [initial] = useState(() => readStudyState());
  const [state, setState] = useState(initial.state);
  const [warning, setWarning] = useState(initial.warning);
  useEffect(() => { if (state.remember) { const saved = writeStudyState(browserStorage(),state); if (saved.warning) setWarning(saved.warning); } }, [state]);
  const recordExercise = useCallback(result => setState(prev => addExercise(prev,result)),[]);
  const recordQuiz = useCallback(result => setState(prev => addQuiz(prev,result)),[]);
  const saveDrafts = useCallback(drafts => setState(prev => ({...prev,drafts})),[]);
  function setRemember(enabled) { const next = {...state,remember:enabled}; const saved = writeStudyState(browserStorage(),next); setWarning(saved.warning); setState(next); }
  function clearProgress() { const next = {...emptyStudyState(),remember:state.remember}; const saved = writeStudyState(browserStorage(),next); setWarning(saved.warning); setState(next); }
  return { state, warning, recordExercise, recordQuiz, saveDrafts, setRemember, clearProgress };
}
