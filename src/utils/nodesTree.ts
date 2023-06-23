import { Node } from '../types/Node';
import { NodeData } from '../types/NodeData';

export const getNode = (rootNode: Node, id: string): Node | null => {
  if (rootNode.id === id) return rootNode;
  return rootNode.child ? getNode(rootNode.child, id) : null;
};

export const getParentValues = (rootNode: Node, currentNode: Node): NodeData[] => {
  if (rootNode.id === currentNode.id) return [...rootNode.data];
  return rootNode.child
    ? [...rootNode.data, ...getParentValues(rootNode.child, currentNode)]
    : [...rootNode.data];
};
