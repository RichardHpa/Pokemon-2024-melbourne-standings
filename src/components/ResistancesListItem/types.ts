import type { Standing } from 'types/standing';

export interface ResistancesListItemProps {
  state: 'above' | 'below';
  player: Standing;
}
