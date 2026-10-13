import {render,screen,fireEvent} from '@testing-library/react';
import VisualTrainer from './VisualTrainer';
test('check mode hides meanings until answered, while learn mode explains them',()=>{
 render(<VisualTrainer/>);fireEvent.click(screen.getByRole('button',{name:'Check recognition'}));
 expect(screen.queryByText('Steady green means cleared to cross, proceed, or go.')).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Proceed / go'}));expect(screen.getByRole('status')).toHaveTextContent('Steady green means');
 fireEvent.click(screen.getByRole('button',{name:'Learn signals'}));expect(screen.getByText('Steady green means cleared to cross, proceed, or go.')).toBeInTheDocument();
});
test('paused flashing signals keep a static pattern description',()=>{
 render(<VisualTrainer/>);fireEvent.change(screen.getByLabelText('Choose visual example'),{target:{value:'flashing-red'}});
 fireEvent.click(screen.getByRole('button',{name:'Pause animation'}));expect(screen.getByText(/Flashing red.*animation paused/i)).toBeInTheDocument();
});
