import { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Card } from 'components/Card';
import { RoundsTable } from 'components/RoundsTable';
import { SimilarPoints } from 'components/SimilarPoints';
import { StandingsList } from 'components/StandingsList';

import { invariant } from 'utils/invariant';
import { createPlayerName } from 'utils/createPlayerName';
import { getPlayerInfo } from 'utils/getPlayerInfo';
import { calculatePoints } from 'utils/calculatePoints';

import { getPokedataStandings } from 'api/getPokedataStandings';

import { tournamentId } from 'constants/tournamentInfo';

import type { Standing } from 'types/standing';

export const Player = () => {
  const { playerName } = useParams();
  invariant(playerName);
  const queryClient = useQueryClient();
  const [data, setData] = useState<Standing[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await queryClient.ensureQueryData({
        queryKey: ['tournamentId', tournamentId],
        queryFn: () => getPokedataStandings(tournamentId),
      });
      setData(res);
    }

    fetchData();
  }, [queryClient]);

  const player = useMemo(() => {
    if (!data) return undefined;
    const res = getPlayerInfo(data, createPlayerName(playerName));
    if (!res) throw new Error('Player not found');
    return { ...res.player, index: res.index };
  }, [data, playerName]);

  const totalPoints = useMemo(() => {
    if (!player) return undefined;
    return calculatePoints(player.record);
  }, [player]);

  if (!player || !data) {
    return (
      <h4 className="text-2xl font-bold dark:text-white text-center">Loading Player Info...</h4>
    );
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
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-2">
            Players with also {totalPoints} Points
          </h5>
          <SimilarPoints player={player} data={data} />
        </Card>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 min-h-96">
          <Card>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-2">
              Current placement on the ladder
            </h5>

            <StandingsList data={data} currentPlayerIndex={player.index} />
          </Card>
        </div>
      </div>
    </>
  );
};
