import { NODES_TREE_SLEEP, UPDATE_NODES_TREE } from '../store/constants/nodesTree';
import { AppDispatch } from '../store';
import { Node } from '../types/Node';

export const updateNodesTree = ({ id, data, childId }: Node) => {
  return async (dispatch: AppDispatch) => {
    const newNode = {
      id,
      data,
      childId,
    };
    console.log('Service', newNode);
    dispatch({ type: UPDATE_NODES_TREE, node: newNode });
    dispatch({ type: NODES_TREE_SLEEP });
  };
};
