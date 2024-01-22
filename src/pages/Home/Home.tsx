import { useQuery } from '@tanstack/react-query';

import { Card } from 'components/Card';
import { PlayerCard } from 'components/PlayerCard';

import { getPokedataStandings } from 'api/getPokedataStandingsUrl';

import { tournamentId } from 'constants/tournamentInfo';

export const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tournamentId', tournamentId],
    queryFn: () => getPokedataStandings(tournamentId),
  });

  return (
    <div>
      <h1 className="text-5xl font-extrabold dark:text-white text-center">
        Pokemon TCG Melbourne Regionals Standings
      </h1>
      <div className="mt-10">
        {isLoading ? (
          <h4 className="text-2xl font-bold dark:text-white text-center">Loading Standings...</h4>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data?.map(player => (
              <div className="flex-1" key={player.name}>
                <Card>
                  <PlayerCard player={player} />
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
