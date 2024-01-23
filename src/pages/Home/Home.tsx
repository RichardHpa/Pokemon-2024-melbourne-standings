import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card } from 'components/Card';
import { PlayerCard } from 'components/PlayerCard';

import { getPokedataStandings } from 'api/getPokedataStandings';
import { getPlayersStandings } from 'utils/getPlayersStandings';

import { tournamentId } from 'constants/tournamentInfo';
import { basePlayerNames } from 'constants/basePlayerNames';

export const Home = () => {
  const { data, isLoading, dataUpdatedAt, refetch } = useQuery({
    queryKey: ['tournamentId', tournamentId],
    queryFn: () => getPokedataStandings(tournamentId),
  });

  const filteredPlayers = useMemo(() => {
    if (!data) return undefined;
    return getPlayersStandings(data, basePlayerNames);
  }, [data]);

  const formattedDate = new Date(dataUpdatedAt).toString();

  return (
    <div>
      <h1 className="text-5xl font-extrabold dark:text-white text-center">
        Pokemon TCG Melbourne Regionals Standings
      </h1>
      <div className="mt-10">
        {isLoading ? (
          <h4 className="text-2xl font-bold dark:text-white text-center">Loading Standings...</h4>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPlayers?.map(player => (
                <div className="flex-1" key={player.name}>
                  <Card>
                    <PlayerCard player={player} />
                  </Card>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow mt-4 dark:bg-gray-800 p-4 flex justify-between">
              <p>Last updated at {formattedDate}</p>

              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => refetch()}
              >
                Refresh Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
