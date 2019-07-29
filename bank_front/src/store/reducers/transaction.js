import * as actionTypes from '../actions/actionTypes';

const initialState = {
  incomes: [],
  expenses: [],
  transactions: [],
  loading: false,
  error: '',
};

const gettingTransactionsStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const gettingTransactionsSuccess = (state,action)=>{
  return{
    ...state,
    incomes:action.incomes,
    expenses:action.expenses,
    loading:false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_TRANSACTIONS_START:
      return gettingTransactionsStart(state,action);
    case actionTypes.GETTING_TRANSACTIONS_SUCCESS:
      return gettingTransactionsSuccess(state,action);
    default:
      return state
  }
};

export default reducer;
