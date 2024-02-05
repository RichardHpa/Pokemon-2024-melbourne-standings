import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Card } from 'components/Card';
import { RoundsTable } from 'components/RoundsTable';
import { SimilarPoints } from 'components/SimilarPoints';
import { StandingsList } from 'components/StandingsList';
import { useTournament } from 'context/TournamentContext';

import { invariant } from 'utils/invariant';
import { createPlayerName } from 'utils/createPlayerName';
import { getPlayerInfo } from 'utils/getPlayerInfo';
import { calculatePoints } from 'utils/calculatePoints';

import { getPokedataStandings } from 'api/getPokedataStandings';

export const Player = () => {
  const { playerName } = useParams();
  invariant(playerName);

  const { tournamentId } = useTournament();

  const { data, isLoading } = useQuery({
    queryKey: ['tournamentId', tournamentId],
    queryFn: () => getPokedataStandings(tournamentId),
  });

  const player = useMemo(() => {
    if (!data) return;
    const res = getPlayerInfo(data, createPlayerName(playerName));
    if (!res) return;
    return { ...res.player };
  }, [data, playerName]);

  const totalPoints = useMemo(() => {
    if (!player) return;

    return calculatePoints(player.record);
  }, [player]);

  const rounds = useMemo(() => {
    if (!player) return [];
    return Object.keys(player.rounds).map(round => player.rounds[round]);
  }, [player]);

  if (isLoading) {
    return (
      <h4 className="text-2xl font-bold dark:text-white text-center">Loading Player Info...</h4>
    );
  }

  if (!player) {
    return <h4 className="text-2xl font-bold dark:text-white text-center">Player not found</h4>;
  }

  if (!data) {
    return <h4 className="text-2xl font-bold dark:text-white text-center">No data available</h4>;
  }

  return (
    <>
      <div className="mb-4">
        <Card>
          <div className="flex justify-between align-top  items-start">
            <div className="font-medium dark:text-white flex flex-col gap-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                {player.name}{' '}
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {player.record.wins}-{player.record.losses}-{player.record.ties} ({totalPoints})
                </span>
              </h5>
              <p>
                Current Standing{' '}
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {player.placing}
                </span>
              </p>
              <p>
                Resistance{' '}
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {player.resistances.opp}
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-2">
            Rounds
          </h5>
          <RoundsTable rounds={player.rounds} />
        </Card>
        <Card>
          {rounds.length > 1 && (
            <SimilarPoints player={player} data={data} totalPoints={totalPoints} />
          )}
        </Card>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 min-h-96">
          <Card>
            {rounds.length > 1 && (
              <StandingsList data={data} currentPlayerIndex={player.placing - 1} />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
