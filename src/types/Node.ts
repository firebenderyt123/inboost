import { NodeData } from './NodeData';

export type Node = {
  id: string;
  data: NodeData[];
  childId: string | null;
};
