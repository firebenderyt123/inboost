import React, { useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Node from './components/Node';
import { Node as NodeType } from './types/Node';
import { NodeData } from './types/NodeData';

import { useAppSelector } from './hooks/redux';
import { selectLastChangedNode } from './store/selectors/nodesTree';

const INIT_TOTAL_NODES = 4;

const nodeTypes = {
  input: Node,
};

type initialNodeType = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeType;
  type: string;
};

const initialNodes: initialNodeType[] = Array.from({ length: INIT_TOTAL_NODES }, (_, index) => {
  return {
    id: `n${index + 1}`,
    position: { x: 200 * index, y: 100 * index },
    data: {
      id: `n${index + 1}`,
      data: [],
      childId: index + 1 < INIT_TOTAL_NODES ? `n${index + 2}` : null,
    },
    type: 'input',
  };
});

const initialEdges = Array.from({ length: INIT_TOTAL_NODES - 1 }, (_, index) => ({
  id: `e${index + 1}-${index + 2}`,
  source: `n${index + 1}`,
  target: `n${index + 2}`,
}));

const newNodes = (
  nodes: initialNodeType[],
  node: initialNodeType,
  changedNode: NodeType,
): initialNodeType[] => {
  console.log('newNodes', node.id, node, changedNode, nodes);
  if (changedNode.id !== node.id) node.data.data = [...changedNode.data, ...node.data.data];
  else node.data.data = [...changedNode.data];
  nodes = [...nodes.filter((n) => n.id !== node.id), node];
  const nextNode = nodes.find((n) => n.id === node.data.childId);
  if (!nextNode) return nodes;
  return newNodes(nodes, nextNode, node.data);
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const lastChangedNode = useAppSelector(selectLastChangedNode);

  useEffect(() => {
    if (lastChangedNode !== null) {
      setNodes((prev) =>
        newNodes(
          prev as initialNodeType[],
          prev.find((nds) => nds.id === lastChangedNode.id) as initialNodeType,
          lastChangedNode,
        ),
      );
    }
  }, [lastChangedNode]);

  console.log(nodes, lastChangedNode);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
