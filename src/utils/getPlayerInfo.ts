import type { Standing } from 'types/standing';

export const getPlayerInfo = (data: Standing[], name: string) => {
  if (!data) return undefined;
  const filteredData = data.filter(player => player.name === name);
  return filteredData[0];
};
