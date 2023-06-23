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
import useSessionStorage from './hooks/sessionStorage';

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
      parent: null,
      data: [],
      child: null,
    },
    type: 'input',
  };
});

const initialEdges = Array.from({ length: INIT_TOTAL_NODES - 1 }, (_, index) => ({
  id: `e${index + 1}-${index + 2}`,
  source: `n${index + 1}`,
  target: `n${index + 2}`,
}));

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [storageNodes, setStorageNodes] = useSessionStorage('nodes', []);
  const [storageEdges, setStorageEdges] = useSessionStorage('edges', []);

  useEffect(() => {
    if (nodes.length) {
      setStorageNodes(nodes);
      setStorageEdges(edges);
    } else {
      setNodes(storageNodes.length ? storageNodes : initialNodes);
      setEdges(storageEdges.length ? storageEdges : initialEdges);
    }
  }, [nodes]);

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
