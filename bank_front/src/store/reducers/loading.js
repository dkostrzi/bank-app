import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
};

const loadingStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loadingStop = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return loadingStart(state,action);
    case actionTypes.STOP_LOADING:
      return loadingStop(state,action);
    default:
      return state;
  }
};

export default reducer;

