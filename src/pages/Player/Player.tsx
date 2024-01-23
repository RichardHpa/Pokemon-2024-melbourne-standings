import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Card } from 'components/Card';

import { invariant } from 'utils/invariant';
import { createPlayerName } from 'utils/createPlayerName';
import { getPlayerInfo } from 'utils/getPlayerInfo';
import { calculatePoints } from 'utils/calculatePoints';

import { tournamentId } from 'constants/tournamentInfo';

import type { Standing } from 'types/standing';

export const Player = () => {
  const { playerName } = useParams();
  invariant(playerName);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['tournamentId', tournamentId]) as Standing[];
  console.log(data);

  const player = useMemo(() => {
    if (!data) return undefined;
    return getPlayerInfo(data, createPlayerName(playerName));
  }, [data, playerName]);

  const totalPoints = useMemo(() => {
    if (!player) return undefined;
    return calculatePoints(player.record);
  }, [player]);

  if (!player) {
    return null;
  }

  return (
    <Card>
      <div className="flex justify-between align-top mb-4 items-start">
        <div className="font-medium dark:text-white flex flex-col gap-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {player.name}{' '}
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              {player.record.wins}-{player.record.losses}-{player.record.ties} ({totalPoints})
            </span>
          </h5>
          <p>
            Current Standing{' '}
            <span className="block text-sm text-gray-500 dark:text-gray-400">{player.placing}</span>
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
  );
};
