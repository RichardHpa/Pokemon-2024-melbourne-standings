import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { calculatePoints } from 'utils/calculatePoints';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { RoundsTable } from 'components/RoundsTable';

import type { PlayerCardProps } from './types';
import type { FC } from 'react';

export const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const totalPoints = useMemo(() => {
    return calculatePoints(player.record);
  }, [player.record]);

  return (
    <div>
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
        <Link
          to={`player/${createPlayerUrl(player.name)}`}
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          More info
        </Link>
      </div>
      <hr />
      <div className="flow-root">
        <RoundsTable rounds={player.rounds} />
      </div>
    </div>
  );
};
