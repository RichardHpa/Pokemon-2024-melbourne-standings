import { getPlayersStandings } from 'utils/getPlayersStandings';
import { calculatePoints } from 'utils/calculatePoints';

import { render, screen, waitForElementToBeRemoved } from 'tests/render';

import { Home } from './Home';

import { standings } from 'tests/fixtures/standings';

jest.mock('utils/getPlayersStandings');

const mockedStandings = standings.slice(0, 3);

describe('Home', () => {
  beforeEach(() => {
    (getPlayersStandings as jest.Mock).mockReturnValue(mockedStandings);
  });

  it('renders successfully', async () => {
    render(<Home />);

    expect(screen.getByText('Loading Standings...')).toBeInTheDocument();

    // wait for loading to finish
    await waitForElementToBeRemoved(() => screen.queryByText('Loading Standings...'));

    mockedStandings.forEach(player => {
      const totalPoints = calculatePoints(player.record);
      const headingText = `${player.name} ${player.record.wins}-${player.record.losses}-${player.record.ties} (${totalPoints})`;
      expect(screen.getByRole('heading', { level: 5, name: headingText })).toBeInTheDocument();
    });
  });
});
