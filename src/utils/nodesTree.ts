import { Node } from '../types/Node';
import { NodeData } from '../types/NodeData';

export const getNode = (rootNode: Node, id: string): Node | null => {
  if (rootNode.id === id) return rootNode;
  return rootNode.child ? getNode(rootNode.child, id) : null;
};

export const getParentValues = (currentNode: Node, changedNode: Node): NodeData[] => {
  if (currentNode.id === changedNode.id) return [...changedNode.data];
  return currentNode.parent
    ? [...getParentValues(currentNode.parent, changedNode), ...currentNode.data]
    : [];
};
