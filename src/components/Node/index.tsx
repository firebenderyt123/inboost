import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import MultiSelectInput from '../MultiSelectInput';
import { Node as NodeType } from '../../types/Node';
import { NodeData } from '../../types/NodeData';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectRootNode, selectChangedNode } from '../../store/selectors/nodesTree';
import { updateNodesTree } from '../../services/nodesTree';

import './styles.css';

const TOTAL_OPTIONS = 6;

type NodePropsType = {
  data: NodeType;
};

const getNode = (rootNode: NodeType, id: string): NodeType | null => {
  if (rootNode.id === id) return rootNode;
  return rootNode.child ? getNode(rootNode.child, id) : null;
};

const getParentValues = (currentNode: NodeType, changedNode: NodeType): NodeData[] => {
  if (currentNode.id === changedNode.id) return [...changedNode.data];
  return currentNode.parent
    ? [...getParentValues(currentNode.parent, changedNode), ...currentNode.data]
    : [];
};

function Node({ data: nodeData }: NodePropsType) {
  const { id, parent, data, child } = nodeData;

  const [values, setValues] = useState<NodeData[]>(data);

  const dispatch = useAppDispatch();
  const rootNode = useAppSelector(selectRootNode);
  const changedNode = useAppSelector(selectChangedNode);

  const options: NodeData[] = useMemo(
    () =>
      Array.from({ length: TOTAL_OPTIONS }, (_, index) => {
        return {
          value: `option-${id}-${index + 1}`,
          label: `Варіант ${index + 1}`,
        };
      }),
    [id],
  );

  const updateNodes = useCallback(
    (data: NodeData[]) => {
      console.log('data', data);
      dispatch(updateNodesTree({ id, parent, data, child }));
    },
    [dispatch, id, child],
  );

  const onChange = useCallback(
    (selectedOpts: NodeData[]) => {
      updateNodes(selectedOpts);
      console.log('onChange', selectedOpts, rootNode);
    },
    [rootNode],
  );

  useEffect(() => {
    updateNodes(data);
    console.log('Node.ts', nodeData);
  }, []);

  useEffect(() => {
    if (changedNode && rootNode) {
      const node = getNode(rootNode, id);

      if (node) {
        const newValues = getParentValues(node, changedNode);
        setValues(newValues);
      }
    }
  }, [changedNode, rootNode]);

  return (
    <React.Fragment>
      <Handle type='target' position={Position.Top} id='t' />
      <MultiSelectInput
        className='multi-input nodrag'
        placeholder='Виберіть значення'
        options={options}
        onChange={onChange}
        value={values}
      />
      <Handle type='source' position={Position.Bottom} id='b' />
    </React.Fragment>
  );
}

export default React.memo(Node);
