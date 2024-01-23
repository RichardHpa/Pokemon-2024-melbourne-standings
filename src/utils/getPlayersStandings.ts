import type { Standing } from 'types/standing';

export const getPlayersStandings = (data: Standing[], names: string[]) => {
  if (!data) return undefined;
  const filteredData = data.filter(player => names.includes(player.name));
  return filteredData;
};
