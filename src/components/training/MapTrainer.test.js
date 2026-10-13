import {render,screen,fireEvent} from '@testing-library/react';
import MapTrainer from './MapTrainer';
test('map target locations survive zoom and do not expose their names before answering',()=>{
 render(<MapTrainer/>);const target=screen.getByRole('button',{name:'Map target A'});
 expect(target.style.left).toBe('40%');fireEvent.click(screen.getByRole('button',{name:'Zoom in drill map'}));expect(target.style.left).toBe('40%');
 expect(screen.queryByText('Correct target: A')).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Map target B'}));expect(screen.getByRole('status')).toHaveTextContent('Reconsider');
 fireEvent.click(target);expect(screen.getByRole('status')).toHaveTextContent('Correct');
});
test('text map alternative is a complete exercise',()=>{
 const onResult=jest.fn();render(<MapTrainer onResult={onResult}/>);fireEvent.click(screen.getByRole('button',{name:'Text alternative'}));
 fireEvent.click(screen.getByRole('button',{name:/^A.*east–west/i}));fireEvent.click(screen.getByRole('button',{name:'Complete drill'}));
 expect(onResult.mock.calls[0][0]).toMatchObject({moduleId:'map',completed:true,firstAttemptCorrect:true});
});
test('crossing sequence rejects premature crossing',()=>{
 render(<MapTrainer/>);fireEvent.change(screen.getByLabelText('Choose map drill'),{target:{value:'crossing-sequence'}});
 fireEvent.click(screen.getByRole('button',{name:'Add step: Cross the runway'}));fireEvent.click(screen.getByRole('button',{name:'Check sequence'}));
 expect(screen.getByRole('status')).toHaveTextContent('Reconsider');expect(screen.getByRole('button',{name:'Complete drill'})).toBeDisabled();
});

test('first evaluated map answer remains correct after exploring another target',()=>{
 const onResult=jest.fn();render(<MapTrainer onResult={onResult}/>);
 fireEvent.click(screen.getByRole('button',{name:'Map target A'}));fireEvent.click(screen.getByRole('button',{name:'Map target B'}));fireEvent.click(screen.getByRole('button',{name:'Map target A'}));fireEvent.click(screen.getByRole('button',{name:'Complete drill'}));
 expect(onResult.mock.calls[0][0].firstAttemptCorrect).toBe(true);
});
