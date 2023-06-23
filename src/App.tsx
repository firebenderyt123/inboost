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
import { selectChangedNode, selectRootNode } from './store/selectors/nodesTree';

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

/// ???????
// const newNodes = (
//   nodes: initialNodeType[],
//   changedNode: NodeType,
//   parentData: NodeData[],
// ): initialNodeType[] => {
//   const node = nodes.find((n) => n.id === changedNode.id);
//   if (!node) return nodes;
//   const newData = [...parentData, ...node.data.data];
//   const uniqueData = Array.from(
//     newData
//       .reduce((map, obj) => {
//         map.set(obj.label, obj);
//         return map;
//       }, new Map())
//       .values(),
//   );
//   node.data.data = [...uniqueData];
//   console.log('newNodes', parentData, changedNode, nodes);
//   return node.data.child ? newNodes(nodes, node.data.child, node.data.data) : nodes;
// };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const rootNode = useAppSelector(selectRootNode);
  const changedNode = useAppSelector(selectChangedNode);

  // useEffect(() => {
  //   if (changedNode) {
  //     setNodes((prev) => newNodes(prev as initialNodeType[], changedNode, changedNode.data));
  //     console.log('useEffect', changedNode);
  //   }
  // }, [changedNode]);

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
