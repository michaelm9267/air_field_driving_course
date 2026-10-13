import React,{useState,useRef,useEffect} from 'react';
import ExerciseFeedback from './ExerciseFeedback';
import {resultId} from '../../study/progress';
import Icon from '../Icon';
function Attempt({moduleId,exercise,onResult}) {
 const [index,setIndex]=useState(0),[choice,setChoice]=useState(null),[done,setDone]=useState(false);
 const [attemptId]=useState(resultId);const firstCorrect=useRef(true),heading=useRef(null);
 const step=exercise.steps[index],correct=choice===step.correctChoice;
 useEffect(()=>{heading.current?.focus();},[index,done]);
 function select(id){if(id!==step.correctChoice)firstCorrect.current=false;setChoice(id);}
 function next(){if(!correct||done)return;if(index<exercise.steps.length-1){setIndex(index+1);setChoice(null);}else{setDone(true);onResult?.({id:attemptId,moduleId,exerciseId:exercise.id,correct:firstCorrect.current,firstAttemptCorrect:firstCorrect.current,completed:true,completedAt:new Date().toISOString()});}}
 if(done)return <div className="panel exercise-card completion-card"><Icon name="check"/><h2 ref={heading} tabIndex="-1">Scenario complete</h2><p>{firstCorrect.current?'All decisions were correct on the first attempt.':'You corrected the missed decisions. The first-attempt result stays in your study history.'}</p><p>Select another scenario above to keep practicing.</p></div>;
 return <article className="panel exercise-card"><span className="eyebrow">SIMULATED SITUATION · STEP {index+1} OF {exercise.steps.length}</span><h2 ref={heading} tabIndex="-1">{exercise.title}</h2><p className="situation-text">{exercise.situation}</p><h3>{step.prompt}</h3><div className="exercise-choices">{step.choices.map(o=><button className={`answer-button ${choice===o.id?(correct?'correct':'incorrect'):''}`} key={o.id} aria-pressed={choice===o.id} onClick={()=>select(o.id)}>{o.text}</button>)}</div>{choice&&<ExerciseFeedback correct={correct} explanation={step.explanation} reference={step.reference} source={step.source} consequence={step.consequence}/>}<button className="button primary exercise-next" disabled={!correct} onClick={next}>{index===exercise.steps.length-1?'Complete scenario':'Continue scenario'} <Icon name="arrow"/></button></article>;
}
export default function ScenarioTrainer({moduleId,exercises,onResult}) {
 const [selected,setSelected]=useState(exercises[0].id);const exercise=exercises.find(e=>e.id===selected);
 return <div><label className="field-label" htmlFor={`${moduleId}-scenario`}>Choose scenario</label><select id={`${moduleId}-scenario`} value={selected} onChange={e=>setSelected(e.target.value)}>{exercises.map(e=><option value={e.id} key={e.id}>{e.title}</option>)}</select><Attempt key={selected} moduleId={moduleId} exercise={exercise} onResult={onResult}/></div>;
}
