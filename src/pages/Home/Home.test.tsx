import { render, screen } from '@testing-library/react';

import { Home } from './Home';

describe('Home', () => {
  it('renders successfully', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
