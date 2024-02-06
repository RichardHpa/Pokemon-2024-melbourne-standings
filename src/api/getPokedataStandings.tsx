// import axios from 'axios';

import melbourneFinalStandings from 'data/melbourneFinalStandings.json';

import type { Standing } from 'types/standing';

// This was used to talk to a real api
// const getPokedataStandingsUrl = (tournamentId: string) => {
//   if (process.env.NODE_ENV === 'development') {
//     return `http://localhost:8080/standings/${tournamentId}`;
//   }
//   return `https://pokemonserver.fly.dev/standings/${tournamentId}`;
// };

export const getPokedataStandings = async (tournamentId: string) => {
  // const url = getPokedataStandingsUrl(tournamentId);

  // const response = await axios.get(url).then(res => {
  //   const data = res.data as Standing[];
  //   return data;
  // });

  await new Promise(resolve => setTimeout(resolve, 1500));

  const response = melbourneFinalStandings as Standing[];

  return response;
};
