import { useGetSimilarPlayers } from 'hooks/useGetSimilarPlayers';

import { ResistancesListItem } from 'components/ResistancesListItem';

import type { FC } from 'react';
import type { SimilarPointsProps } from './types';

export const SimilarPoints: FC<SimilarPointsProps> = ({ player, data }) => {
  const players = useGetSimilarPlayers(player.placing - 1, data);

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {players?.above?.map(otherPlayer => {
        return <ResistancesListItem state="above" player={otherPlayer} key={otherPlayer.name} />;
      })}

      <li className="py-3 sm:py-4 bg-gray-700">
        <div className="flex items-center">
          <div className="flex-1 min-w-0 mx-2">
            <div className="flex justify-between font-bold flex-wrap">
              <p>Your Placement</p>

              <p>{player.resistances.opp}</p>
            </div>
          </div>
        </div>
      </li>

      {players?.above?.map(otherPlayer => {
        return <ResistancesListItem state="below" player={otherPlayer} key={otherPlayer.name} />;
      })}
    </ul>
  );
};
