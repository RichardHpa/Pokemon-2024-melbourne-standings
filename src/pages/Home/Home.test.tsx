import { render, screen } from 'tests/render';

import { Home } from './Home';

describe('Home', () => {
  it('renders successfully', () => {
    render(<Home />);
    expect(screen.getByText('Pokemon TCG Melbourne Regionals Standings')).toBeInTheDocument();
  });
});
