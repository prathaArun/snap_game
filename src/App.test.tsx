import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headElement = screen.getByText(/Let's play snap card/i);
  expect(headElement).toBeInTheDocument();
});
