import { NodeData } from './NodeData';

export type Node = {
  id: string;
  parent: Node | null;
  data: NodeData[];
  child: Node | null;
};
