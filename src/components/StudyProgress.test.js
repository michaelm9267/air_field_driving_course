import {render,screen,fireEvent} from '@testing-library/react';
import StudyProgress from './StudyProgress';
import useStudyProgress from '../study/useStudyProgress';
import {STORAGE_KEY} from '../study/progress';
function Harness(){const progress=useStudyProgress();return <><StudyProgress progress={progress}/><button onClick={()=>progress.recordExercise({id:'one',moduleId:'scenarios',exerciseId:'test',firstAttemptCorrect:false,correct:false,completed:true,completedAt:new Date().toISOString()})}>Record exercise</button></>;}
beforeEach(()=>localStorage.clear());
test('memory-off setting prevents subsequent activity writes',()=>{
 render(<Harness/>);fireEvent.click(screen.getByLabelText('Remember progress on this device'));
 expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).remember).toBe(false);
 fireEvent.click(screen.getByRole('button',{name:'Record exercise'}));expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).results).toHaveLength(0);
 expect(screen.getByText('1 exercise completed')).toBeInTheDocument();
});
test('clearing history requires explicit confirmation',()=>{
 render(<Harness/>);fireEvent.click(screen.getByRole('button',{name:'Record exercise'}));fireEvent.click(screen.getByRole('button',{name:'Clear study data'}));
 expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).results).toHaveLength(1);
 fireEvent.click(screen.getByRole('button',{name:'Confirm clear'}));expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).results).toHaveLength(0);
});
