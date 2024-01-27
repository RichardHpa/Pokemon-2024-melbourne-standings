import { rest } from 'msw';

import { standings } from 'tests/fixtures/standings';

export const handlers = [
  rest.get('https://pokemonserver.fly.dev/standings/:tournamentId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(standings));
  }),
];
