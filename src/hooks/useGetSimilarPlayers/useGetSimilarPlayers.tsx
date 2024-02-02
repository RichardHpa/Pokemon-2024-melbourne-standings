import { calculatePoints } from 'utils/calculatePoints';

import type { Standing } from 'types/standing';

interface PlayerRes {
  above: Standing[];
  below: Standing[];
}

export const useGetSimilarPlayers = (index: number, data: Standing[]) => {
  if (!data || !index) return undefined;
  const playersRes: PlayerRes = {
    above: [],
    below: [],
  };

  console.log(data[index + 1]);
  console.log(data[index]);
  console.log(data[index - 1]);
  const player = data[index];
  const points = calculatePoints(player.record);

  // Search the players above the index for the same points and stop when the points are different
  const playersAbove: Standing[] = [];
  for (let i = index - 1; i >= 0; i--) {
    if (calculatePoints(data[i].record) === points) {
      playersAbove.unshift(data[i]);
    } else {
      break;
    }
  }

  // Search the players below the index for the same points and stop when the points are different
  const playersBelow: Standing[] = [];
  for (let i = index + 1; i < data.length; i++) {
    if (calculatePoints(data[i].record) === points) {
      playersBelow.push(data[i]);
    } else {
      break;
    }
  }

  playersRes.above = playersAbove;
  playersRes.below = playersBelow;

  return playersRes;
};