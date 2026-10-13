import { render, screen, fireEvent } from '@testing-library/react';
import AirfieldMap from './AirfieldMap';

// Guard the useful viewing behaviors: preserving the source, returning to fit,
// and keeping study overlays out of the question's published diagram.
test('readable study view can switch to the unchanged published diagram', () => {
  render(<AirfieldMap />);
  expect(screen.getByRole('img', { name: /simplified elmendorf/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /published diagram/i }));
  expect(screen.getByRole('img', { name: /elmendorf airfield diagram/i })).toHaveAttribute('src', expect.stringContaining('elmendorf-map.jpeg'));
  expect(screen.queryByRole('img', { name: /simplified elmendorf/i })).not.toBeInTheDocument();
});

test('fit map resets both zoom and a focused feature', () => {
  render(<AirfieldMap />);
  fireEvent.click(screen.getByRole('button', { name: /focus on runway 06/i }));
  expect(screen.getByRole('button', { name: /focus on runway 06/i })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: /zoom in map/i }));
  expect(screen.getByText('150%', { exact: true })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /fit map/i }));
  expect(screen.getByText('100%', { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /focus on runway 06/i })).toHaveAttribute('aria-pressed', 'false');
});

test('quiz maps begin on the published diagram and expose no study overlays', () => {
  render(<AirfieldMap compact />);
  expect(screen.getByRole('img', { name: /elmendorf airfield diagram/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /study view/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /focus on runway/i })).not.toBeInTheDocument();
});

test('opening markings from the study guide preserves keyboard focus', () => {
  render(<AirfieldMap />);
  const open = screen.getByRole('button', { name: /see markings and boundaries/i });
  open.focus();
  fireEvent.click(open);
  expect(screen.getByRole('button', { name: /published diagram/i })).toHaveFocus();
});
