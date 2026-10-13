import {useRef,useState} from 'react';
import {resultId} from './progress';
export default function useExerciseAttempt(moduleId,exerciseId,onResult) {
 const [id]=useState(resultId),[done,setDone]=useState(false);const first=useRef(true),finished=useRef(false);
 function answer(correct){if(!correct)first.current=false;}
 function finish(){if(finished.current)return;finished.current=true;setDone(true);onResult?.({id,moduleId,exerciseId,correct:first.current,firstAttemptCorrect:first.current,completed:true,completedAt:new Date().toISOString()});}
 return {answer,finish,done,firstCorrect:first.current};
}
