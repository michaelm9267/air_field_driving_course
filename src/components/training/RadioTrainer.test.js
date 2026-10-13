import {render,screen,fireEvent} from '@testing-library/react';
import RadioTrainer from './RadioTrainer';
test('missing the runway is rejected and a complete readback is accepted',()=>{
 render(<RadioTrainer/>);fireEvent.click(screen.getByRole('button',{name:'Add phrase: Airfield One'}));fireEvent.click(screen.getByRole('button',{name:'Add phrase: hold short of'}));
 fireEvent.click(screen.getByRole('button',{name:'Check readback'}));expect(screen.getByRole('status')).toHaveTextContent('Reconsider');
 fireEvent.click(screen.getByRole('button',{name:'Add phrase: runway zero six'}));fireEvent.click(screen.getByRole('button',{name:'Check readback'}));expect(screen.getByRole('status')).toHaveTextContent('Correct');
});
test('radio transcript is usable without speech synthesis',()=>{render(<RadioTrainer/>);expect(screen.getByText(/Airfield One, hold short of runway zero six/)).toBeInTheDocument();expect(screen.getByText(/Audio is unavailable/)).toBeInTheDocument();});
test('playing speech is canceled when the trainer becomes inactive',()=>{
 const cancel=jest.fn(),speak=jest.fn();Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel,speak}});window.SpeechSynthesisUtterance=function(t){this.text=t;};
 const {rerender,unmount}=render(<RadioTrainer active/>);fireEvent.click(screen.getByRole('button',{name:'Play instruction'}));expect(speak.mock.calls[0][0].text).toMatch(/hold short/);
 cancel.mockClear();rerender(<RadioTrainer active={false}/>);expect(cancel).toHaveBeenCalled();unmount();delete window.speechSynthesis;delete window.SpeechSynthesisUtterance;
});
