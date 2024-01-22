import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { tournamentId } from 'constants/tournamentInfo';

const getPokedataStandingsUrlTest = (tournamentId: string) => {
  return `https://pokedata.ovh/standings/${tournamentId}/masters/${tournamentId}_Masters.json`;
};

export const getPokedataStandingsTest = async (tournamentId: string) => {
  const url = getPokedataStandingsUrlTest(tournamentId);

  const response = await axios.get(url).then(res => {
    return res.data;
  });

  return response;
};

export const Test = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tournamentIdTest', tournamentId],
    queryFn: () => getPokedataStandingsTest(tournamentId),
  });

  console.log(data, isLoading);

  return (
    <div>
      Test<div>{isLoading ? 'loading' : 'loaded'}</div>
    </div>
  );
};
