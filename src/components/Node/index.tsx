import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import MultiSelectInput from '../MultiSelectInput';
import { Node as NodeType } from '../../types/Node';
import { NodeData } from '../../types/NodeData';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectNodes } from '../../store/selectors/nodesTree';
import { updateNodesTree } from '../../services/nodesTree';

import './styles.css';

const options: NodeData[] = [
  { value: 'option1', label: 'Варіант 1' },
  { value: 'option2', label: 'Варіант 2' },
  { value: 'option3', label: 'Варіант 3' },
  { value: 'option4', label: 'Варіант 4' },
  { value: 'option5', label: 'Варіант 5' },
  { value: 'option6', label: 'Варіант 6' },
];

type NodePropsType = {
  data: NodeType;
};

// const newNodes = (nodes: NodeType[], node: NodeType, nodeData: NodeData[] = []): NodeType[] => {
//   if (node.childId === null) return nodes;
//   node.data = [...nodeData, ...node.data];
//   nodes = [...nodes.filter((n) => n.id !== node.id), node];
//   const nextNode = nodes.find((n) => n.id === node.childId);
//   if (!nextNode) return nodes;
//   return newNodes(nodes, nextNode, node.data);
// };

function Node({ data: nodeData }: NodePropsType) {
  const { id, data, childId } = nodeData;

  const [selectedOptions, setSelectedOptions] = useState<NodeData[]>(data);

  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);

  const updateNodes = useCallback(
    (data: NodeData[]) => {
      console.log('data', data);
      dispatch(updateNodesTree({ id, data, childId }));
    },
    [dispatch, id, childId],
  );

  const onChange = useCallback(
    (selectedOpts: NodeData[]) => {
      setSelectedOptions(selectedOpts);
      updateNodes(selectedOpts);
      console.log('onChange', selectedOpts);
    },
    [nodes],
  );

  useEffect(() => {
    updateNodes(selectedOptions);
    console.log('Node.ts', nodeData);
  }, []);

  return (
    <React.Fragment>
      <Handle type='target' position={Position.Top} id='t' />
      <MultiSelectInput
        className='multi-input nodrag'
        placeholder='Виберіть значення'
        options={options}
        onChange={onChange}
        value={selectedOptions}
      />
      <Handle type='source' position={Position.Bottom} id='b' />
    </React.Fragment>
  );
}

export default React.memo(Node);
