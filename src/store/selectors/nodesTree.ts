import { RootState } from '../';
import { Node } from '../../types/Node';

export const selectNodes = (state: RootState): Node[] => state.nodesTree.nodes;
export const selectLastChangedNode = (state: RootState): Node | null =>
  state.nodesTree.lastChangedNode;
