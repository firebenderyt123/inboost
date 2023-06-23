import { RootState } from '../';
import { Node } from '../../types/Node';

export const selectRootNode = (state: RootState): Node | null => state.nodesTree.rootNode;
export const selectChangedNode = (state: RootState): Node | null => state.nodesTree.changedNode;
