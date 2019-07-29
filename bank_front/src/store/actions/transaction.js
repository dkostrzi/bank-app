import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import {getUserInfo} from './user';

const gettingTransactionsStart = () => {
  return {
    type: actionTypes.GETTING_TRANSACTIONS_START,
  };
};

const gettingTransactionsSuccess = (incomes, expenses) => {
  return{
    type:actionTypes.GETTING_TRANSACTIONS_SUCCESS,
    incomes:incomes,
    expenses:expenses
  }
};

export const gettingTransactions = (token,uId) => {
  return dispatch =>{

    dispatch(gettingTransactionsStart());

    axios.get(`${API_URL}/transaction`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(res => {
        console.log(res.data);
        const incomes = res.data.filter(transaction => {
          return transaction.id_recipient === uId;
        });
        const expenses = res.data.filter(transaction => {
          return transaction.id_sender === uId;
        });

        dispatch(gettingTransactionsSuccess(incomes,expenses))
        dispatch(getUserInfo(token))


      })
      .catch(err=>{
        console.log(err)
      });
  }

};
