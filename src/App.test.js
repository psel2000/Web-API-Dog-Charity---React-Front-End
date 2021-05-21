import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    
    screen.debug();
    
    expect(screen.getByText(/Canine Shelter Web API/)).toBeInTheDocument();
    expect(screen.getByRole('')).toBeInTheDocument();

    screen.debug();
  });
});
