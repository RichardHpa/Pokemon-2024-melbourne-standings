import type { Standing } from 'types/standing';

interface ExtendedPlayer extends Standing {
  index: number;
}

export interface SimilarPointsProps {
  player: ExtendedPlayer;
  data: Standing[];
}
