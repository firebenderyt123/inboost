import { NodeData } from './NodeData';

export type Node = {
  id: string;
  data: NodeData[];
  child: Node | null;
};
