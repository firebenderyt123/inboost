import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import MultiSelectInput from '../MultiSelectInput';
import { Node as NodeType } from '../../types/Node';
import { NodeData } from '../../types/NodeData';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectRootNode } from '../../store/selectors/nodesTree';
import { updateNodesTree } from '../../services/nodesTree';

import { getNode, getParentValues } from '../../utils/nodesTree';

import './styles.css';

const TOTAL_OPTIONS = 6;

type NodePropsType = {
  data: NodeType;
};

function Node({ data: nodeData }: NodePropsType) {
  const { id, data, child } = nodeData;

  const [values, setValues] = useState<NodeData[]>(data);

  const dispatch = useAppDispatch();
  const rootNode = useAppSelector(selectRootNode);

  const options: NodeData[] = useMemo(
    () =>
      Array.from({ length: TOTAL_OPTIONS }, (_, index) => {
        return {
          id,
          value: `option-${id}-${index + 1}`,
          label: `Варіант ${index + 1}`,
        };
      }),
    [id],
  );

  const updateNodes = useCallback(
    (data: NodeData[]) => {
      dispatch(updateNodesTree({ id, data, child }));
    },
    [dispatch, id, child],
  );

  const onChange = useCallback(
    (selectedOpts: NodeData[]) => {
      updateNodes(selectedOpts.filter((opt) => opt.id === id));
    },
    [rootNode],
  );

  useEffect(() => {
    updateNodes(data);
  }, []);

  useEffect(() => {
    if (rootNode) {
      const node = getNode(rootNode, id);

      if (node) {
        const newValues = getParentValues(rootNode, node);
        setValues(newValues);
      }
    }
  }, [rootNode]);

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
