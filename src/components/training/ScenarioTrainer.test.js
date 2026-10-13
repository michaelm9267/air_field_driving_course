import {render,screen,fireEvent} from '@testing-library/react';
import ScenarioTrainer from './ScenarioTrainer';
const exercises=[{id:'test',title:'Radio failure',situation:'Your radio fails.',steps:[{prompt:'First action?',correctChoice:'exit',choices:[{id:'wait',text:'Wait on runway'},{id:'exit',text:'Exit runway'}],explanation:'Vacate immediately.',consequence:'Remaining blocks the runway.',reference:'DAFI 13-213, 4.3.2',source:'dafi'}]}];
test('a corrected scenario preserves its failed first attempt',()=>{
 const onResult=jest.fn();render(<ScenarioTrainer moduleId="scenarios" exercises={exercises} onResult={onResult}/>);
 fireEvent.click(screen.getByRole('button',{name:'Wait on runway'}));
 expect(screen.getByRole('button',{name:/complete scenario/i})).toBeDisabled();
 expect(screen.getByRole('status')).toHaveTextContent('Remaining blocks the runway.');
 fireEvent.click(screen.getByRole('button',{name:'Exit runway'}));fireEvent.click(screen.getByRole('button',{name:/complete scenario/i}));
 expect(onResult).toHaveBeenCalledTimes(1);expect(onResult.mock.calls[0][0]).toMatchObject({firstAttemptCorrect:false,correct:false,completed:true});
 expect(screen.getByRole('heading',{name:/scenario complete/i})).toHaveFocus();
});
