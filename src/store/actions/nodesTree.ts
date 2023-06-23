import { UPDATE_NODES_TREE, NODES_TREE_SLEEP } from '../constants/nodesTree';
import { Node } from '../../types/Node';

interface UpdateNodesTreeAction {
  type: typeof UPDATE_NODES_TREE;
  node: Node;
}

interface NodesTreeSleepAction {
  type: typeof NODES_TREE_SLEEP;
}

export type NodesTreeActions = UpdateNodesTreeAction | NodesTreeSleepAction;

export const updateNodesTree = (node: Node): UpdateNodesTreeAction => ({
  type: UPDATE_NODES_TREE,
  node,
});

export const nodesTreeSleep = (): NodesTreeSleepAction => ({
  type: NODES_TREE_SLEEP,
});
