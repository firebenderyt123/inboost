import { NODES_TREE_SLEEP, UPDATE_NODES_TREE } from '../constants/nodesTree';
import { NodesTreeActions } from '../actions/nodesTree';
import { Node } from '../../types/Node';

interface NodesTreeInterface {
  nodes: Node[];
  lastChangedNode: Node | null;
}

export type NodesTreeState = NodesTreeInterface;

const initialState: NodesTreeState = {
  nodes: [],
  lastChangedNode: null,
};

export default function nodesTreeReducer(
  state = initialState,
  action: NodesTreeActions,
): NodesTreeState {
  switch (action.type) {
    case NODES_TREE_SLEEP: {
      return state;
    }
    case UPDATE_NODES_TREE: {
      return {
        ...state,
        nodes: [...state.nodes.filter((node) => node.id !== action.node.id), action.node],
        lastChangedNode: action.node,
      };
    }
    default:
      return state;
  }
}
