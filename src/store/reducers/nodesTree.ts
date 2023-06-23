import { NODES_TREE_SLEEP, UPDATE_NODES_TREE } from '../constants/nodesTree';
import { NodesTreeActions } from '../actions/nodesTree';
import { Node } from '../../types/Node';

interface NodesTreeInterface {
  rootNode: Node | null;
  changedNode: Node | null;
}

export type NodesTreeState = NodesTreeInterface;

const initialState: NodesTreeState = {
  rootNode: null,
  changedNode: null,
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
      const rootNode = state.rootNode;

      if (rootNode === null) {
        return {
          ...state,
          rootNode: action.node,
          changedNode: action.node,
        };
      }

      const updateNode = (node: Node, newNode: Node): Node => {
        if (node.id === newNode.id) {
          return {
            ...node,
            data: newNode.data,
          };
        } else if (node.child === null) {
          return {
            ...node,
            child: newNode,
          };
        } else {
          return {
            ...node,
            child: updateNode(node.child, newNode),
          };
        }
      };

      const newRootNode = updateNode(rootNode, action.node);
      return {
        ...state,
        rootNode: newRootNode,
        changedNode: action.node,
      };
    }
    default:
      return state;
  }
}
