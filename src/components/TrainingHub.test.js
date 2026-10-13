import {render,screen,fireEvent} from '@testing-library/react';
import App from '../App';
beforeEach(()=>localStorage.clear());
test('all six training launch cards are available and an unfinished scenario survives page navigation',()=>{
 render(<App/>);fireEvent.click(screen.getByRole('button',{name:'Training',exact:true}));
 for(const name of ['Decision scenarios','Map and route drills','Radio communications','Signals and markings','Winter and night operations','Knowledge practice'])expect(screen.getByRole('button',{name:`Open ${name}`})).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Open Decision scenarios'}));fireEvent.click(screen.getByRole('button',{name:'Exit the runway immediately and safely'}));fireEvent.click(screen.getByRole('button',{name:'Continue scenario'}));
 fireEvent.click(screen.getByRole('button',{name:'Resources',exact:true}));fireEvent.click(screen.getByRole('button',{name:'Training',exact:true}));
 expect(screen.getByRole('heading',{name:'You are off the runway. What comes next?'})).toBeInTheDocument();
});
test('new destinations retain an unfinished existing quiz',()=>{
 render(<App/>);fireEvent.click(screen.getByRole('button',{name:/start practice/i}));
 const option=screen.getAllByRole('button',{pressed:false}).find(el=>el.classList.contains('answer-button'));fireEvent.click(option);
 fireEvent.click(screen.getByRole('button',{name:'Progress',exact:true}));fireEvent.click(screen.getByRole('button',{name:'My session',exact:true}));
 expect(screen.getAllByRole('button',{pressed:true}).filter(el=>el.classList.contains('answer-button'))).toHaveLength(1);
});
