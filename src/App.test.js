import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import QuestionBox from './components/QuestionBox';

// These tests catch blocked practice access, lost selections, answer leakage,
// premature submission, and incorrect category/correction scoring.
const questions = [
  { id: 101, question: 'Choose the safe action.', 'question-cat': 'general', map: false,
    options: [{ id: 1, option: 'Stop safely' }, { id: 2, option: 'Continue unsafely' }] },
  { id: 102, question: 'Choose the correct readback.', 'question-cat': 'communication', map: false,
    options: [{ id: 1, option: 'Read back the instruction' }, { id: 2, option: 'Say nothing' }] },
];
const answers = [
  { id: 101, correct_answer: 1, ref: 'DAFI 13-213, 4.2.1', explanation: 'Obtain clearance before entering.' },
  { id: 102, correct_answer: 1, ref: 'DAFI 13-213, 4.2.2', explanation: 'Read back ATC instructions.' },
];
const quiz = (testMode = false) => render(<QuestionBox testMode={testMode} questions={questions} answers={answers} />);

test('practice opens without collecting personal information', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /start practice/i }));
  expect(screen.getByRole('heading', { name: /question 1/i })).toBeInTheDocument();
  expect(screen.queryByRole('textbox', { name: /name/i })).not.toBeInTheDocument();
});

test('practice selection and feedback survive navigation', () => {
  quiz();
  fireEvent.click(screen.getByRole('button', { name: /stop safely/i }));
  expect(screen.getByRole('status')).toHaveTextContent('Correct');
  fireEvent.click(screen.getByRole('button', { name: /next question/i }));
  expect(screen.queryByText('Obtain clearance before entering.')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /previous question/i }));
  expect(screen.getByRole('button', { name: /stop safely/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('status')).toHaveTextContent('Correct');
});

test('test mode hides correctness and explanations until submission', () => {
  quiz(true);
  fireEvent.click(screen.getByRole('button', { name: /continue unsafely/i }));
  expect(screen.queryByText('Obtain clearance before entering.')).not.toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.queryByText('DAFI 13-213, 4.2.1')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /continue unsafely/i })).toHaveAttribute('aria-pressed', 'true');
});

test('submission requires every question and reports category results', () => {
  quiz(true);
  expect(screen.getByRole('button', { name: /finish session/i })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /stop safely/i }));
  fireEvent.click(screen.getByRole('button', { name: /next question/i }));
  expect(screen.getByRole('button', { name: /finish session/i })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /say nothing/i }));
  fireEvent.click(screen.getByRole('button', { name: /finish session/i }));
  expect(screen.getByRole('heading', { name: /keep learning/i })).toHaveFocus();
  const row = screen.getByRole('row', { name: /communications/i });
  expect(within(row).getByText('0%')).toBeInTheDocument();
  expect(screen.getByText('Read back ATC instructions.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /review missed questions/i }));
  expect(screen.getByRole('heading', { name: /question 1/i })).toBeInTheDocument();
  expect(screen.getByText('Choose the correct readback.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /read back the instruction/i }));
  fireEvent.click(screen.getByRole('button', { name: /finish session/i }));
  expect(screen.getByRole('heading', { name: /session complete/i })).toBeInTheDocument();
});

test('80 percent general knowledge still identifies answers needing correction', () => {
  const five = Array.from({ length: 5 }, (_, i) => ({ ...questions[0], id: 201 + i }));
  const keys = five.map(q => ({ ...answers[0], id: q.id }));
  render(<QuestionBox testMode questions={five} answers={keys} />);
  for (let i = 0; i < 5; i++) {
    fireEvent.click(screen.getByRole('button', { name: i === 4 ? /continue unsafely/i : /stop safely/i }));
    if (i < 4) fireEvent.click(screen.getByRole('button', { name: /next question/i }));
  }
  fireEvent.click(screen.getByRole('button', { name: /finish session/i }));
  expect(screen.getByRole('heading', { name: /keep learning/i })).toBeInTheDocument();
  expect(screen.getByRole('row', { name: /general knowledge/i })).toHaveTextContent('80%');
  expect(screen.getByText(/minimum met.*correction required/i)).toBeInTheDocument();
});

test('topic selection starts only that topic and resources provide the Elmendorf map', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/practice topic/i), { target: { value: 'communication' } });
  fireEvent.click(screen.getByRole('button', { name: /start practice/i }));
  expect(screen.getByTestId('question-category')).toHaveTextContent('Communications');
  fireEvent.click(screen.getByRole('button', { name: /resources/i }));
  expect(screen.getByRole('img', { name: /elmendorf airfield/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /DAFI 13-213.*official/i })).toHaveAttribute('href', expect.stringContaining('e-publishing.af.mil'));
});

test('missing an Elmendorf instrument hold-line answer requires incursion review', () => {
  const bank = require('./files/questions.json').questions;
  const answerBank = require('./files/answers.json').answers;
  const holdQuestion = bank.find(q => q.id === 20);
  const key = answerBank.find(a => a.id === 20);
  render(<QuestionBox testMode questions={[holdQuestion]} answers={[key]} />);
  fireEvent.click(screen.getByRole('button', { name: /continue if the runway looks clear/i }));
  fireEvent.click(screen.getByRole('button', { name: /finish session/i }));
  expect(screen.getByRole('row', { name: /runway incursion prevention/i })).toHaveTextContent('Review needed');
  expect(screen.queryByText(/minimum met/i)).not.toBeInTheDocument();
});

test('a completed quiz emits one history event across rerenders',()=>{
 const onComplete=jest.fn();const {rerender}=render(<QuestionBox questions={[questions[0]]} answers={[answers[0]]} onComplete={onComplete}/>);
 fireEvent.click(screen.getByRole('button',{name:/stop safely/i}));fireEvent.click(screen.getByRole('button',{name:/finish session/i}));
 rerender(<QuestionBox questions={[questions[0]]} answers={[answers[0]]} onComplete={onComplete}/>);
 expect(onComplete).toHaveBeenCalledTimes(1);expect(onComplete.mock.calls[0][0].outcomes).toEqual([{questionId:101,category:'general',correct:true}]);
});
