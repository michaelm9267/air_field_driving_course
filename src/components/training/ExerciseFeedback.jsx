import React from 'react';
import {sources} from '../../files/course';
import Icon from '../Icon';
export default function ExerciseFeedback({correct,explanation,reference,source='dafi',consequence}) {
 return <div className={`feedback ${correct?'feedback-correct':'feedback-incorrect'}`} role="status"><Icon name={correct?'check':'book'}/><div><strong>{correct?'Correct decision.':'Reconsider this choice.'}</strong>{!correct&&consequence&&<p><b>Simulated consequence:</b> {consequence}</p>}<p>{explanation}</p><a className="citation" href={sources[source].url} target="_blank" rel="noreferrer">{reference} <Icon name="external"/></a></div></div>;
}
