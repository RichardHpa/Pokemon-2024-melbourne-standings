import type { Standing } from 'types/standing';

export const getPlayerInfo = (data: Standing[], name: string) => {
  if (!data) return undefined;
  const filterIndex = data.findIndex(player => player.name === name);

  if (filterIndex === -1) return undefined;

  return { player: data[filterIndex], index: filterIndex };
};
