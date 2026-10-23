import { render, screen } from '@testing-library/react';
import App from './App';

test('renders About Me header', () => {
  render(<App />);
  const headerElement = screen.getByText(/About Me/i);
  expect(headerElement).toBeInTheDocument();
});
