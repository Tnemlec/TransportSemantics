import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/aujourd'hui à paris/i);
  expect(linkElement).toBeInTheDocument();
});
