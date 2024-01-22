export interface Standing {
  name: string;
  placing: number;
  record: {
    wins: number;
    losses: number;
    ties: number;
  };
  resistances: {
    self: number;
    opp: number;
    oppopp: number;
  };
  decklist: string;
  drop: number;
  rounds: {
    [key: string]: {
      name: string;
      result: string;
      table: number;
    };
  };
}
