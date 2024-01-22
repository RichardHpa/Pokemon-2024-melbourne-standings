import axios from 'axios';

import type { Standing } from 'types/standing';

// replace with friends when ready and 3 random players for testing next week
const names = ['Blake Eure [US]', 'Austin Waddle [US]', 'Vinícius fernandez [BR]'];

const getPokedataStandingsUrl = (tournamentId: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:8080/standings/${tournamentId}`;
  }
  return `https://pokemonserver.fly.dev/standings/${tournamentId}`;
};

export const getPokedataStandings = async (tournamentId: string) => {
  const url = getPokedataStandingsUrl(tournamentId);

  const response = await axios.get(url).then(res => {
    const data = res.data as Standing[];
    const filteredData = data.filter(player => names.includes(player.name));
    return filteredData;
  });

  return response;
};
