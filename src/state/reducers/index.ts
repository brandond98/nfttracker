import { combineReducers } from 'redux';
import nftReducer from './nftReducer';
import modalReducer from './modalContentReducer';
import currentReducer from './currentReducer';
import txStatusReducer from './txStatusReducer';
import responseReducer from './responseReducer';
import { asyncReducer } from './asyncReducer';

const reducers = combineReducers({
  nft: nftReducer,
  modal: modalReducer,
  current: currentReducer,
  txStatus: txStatusReducer,
  response: responseReducer,
  async: asyncReducer,
});

export default reducers;
