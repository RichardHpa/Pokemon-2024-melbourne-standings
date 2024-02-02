import { useMemo } from 'react';
import { useGetSimilarPlayers } from 'hooks/useGetSimilarPlayers';

import { ResistancesListItem } from 'components/ResistancesListItem';

import type { FC } from 'react';
import type { SimilarPointsProps } from './types';

export const SimilarPoints: FC<SimilarPointsProps> = ({ player, data }) => {
  const players = useGetSimilarPlayers(player.placing - 1, data);

  console.log(players?.below);

  const renderAbove = useMemo(() => {
    if (!players?.above) return null;
    const length = players?.above.length;
    if (length > 4) {
      return (
        <>
          <ResistancesListItem state="above" player={players.above[0]} />
          <ResistancesListItem state="above" player={players.above[1]} />

          <li className="py-3 sm:py-4 ">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 mx-2">
                <div className="flex justify-between font-bold flex-wrap">
                  <i>...{length - 4} other players</i>
                </div>
              </div>
            </div>
          </li>

          <ResistancesListItem state="above" player={players.above[length - 2]} />
          <ResistancesListItem state="above" player={players.above[length - 1]} />
        </>
      );
    }

    return players?.above?.map(otherPlayer => {
      return <ResistancesListItem state="above" player={otherPlayer} key={otherPlayer.name} />;
    });
  }, [players?.above]);

  const renderBelow = useMemo(() => {
    if (!players?.below) return null;
    const length = players?.below.length;

    if (length > 4) {
      return (
        <>
          <ResistancesListItem state="below" player={players.below[0]} />
          <ResistancesListItem state="below" player={players.below[1]} />

          <li className="py-3 sm:py-4 ">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 mx-2">
                <div className="flex justify-between font-bold flex-wrap">
                  <i>...{length - 4} other players</i>
                </div>
              </div>
            </div>
          </li>

          <ResistancesListItem state="below" player={players.below[length - 2]} />
          <ResistancesListItem state="below" player={players.below[length - 1]} />
        </>
      );
    }

    return players?.below?.map(otherPlayer => {
      return <ResistancesListItem state="below" player={otherPlayer} key={otherPlayer.name} />;
    });
  }, [players?.below]);

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {renderAbove}

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

      {renderBelow}
    </ul>
  );
};
