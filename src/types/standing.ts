export type Results = 'wins' | 'losses' | 'ties';

export type RecordProps = {
  [key in Results]: number;
};

export interface Standing {
  name: string;
  placing: number;
  record: RecordProps;
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
