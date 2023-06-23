import { combineReducers } from 'redux';
import { default as nodesTreeReducer } from './nodesTree';

const rootReducer = combineReducers({
  nodesTree: nodesTreeReducer,
});

export default rootReducer;
