import { render, screen } from '@testing-library/react';

import { Error404 } from './404';

describe('Error404', () => {
  it('renders successfully', () => {
    render(<Error404 />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
