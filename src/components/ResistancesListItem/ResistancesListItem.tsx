import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

import type { ResistancesListItemProps } from './types';
import type { FC } from 'react';

export const ResistancesListItem: FC<ResistancesListItemProps> = ({ state, player }) => {
  return (
    <li className="py-3 sm:py-4" key={player.name}>
      <div className="flex items-center">
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {player.record.wins}-{player.record.losses}-{player.record.ties}
          </p>
          <div className="flex justify-between flex-wrap">
            <p>{player.name}</p>
            <div className="flex gap-1">
              {state === 'above' ? <ChevronUpIcon className="h-6 w-6 text-red-500" /> : null}
              {state === 'below' ? <ChevronDownIcon className="h-6 w-6 text-blue-500" /> : null}
              <p className={state === 'above' ? 'text-red-500' : 'text-blue-500'}>
                {player.resistances.opp}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
