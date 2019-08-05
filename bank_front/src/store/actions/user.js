import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../utils/api';


export const homePageStart = () => {
  return {
    type: actionTypes.GETTING_USERINFO_START,
  };
};

export const gettingUserInfoSuccess = (user, bill) => {
  return {
    type: actionTypes.GETTING_USER_SUCCESS,
    user,
    bill
  };
};

export const logoutUserInfo = ()=>{
  return{
    type:actionTypes.LOGOUT_USER_INFO
  }
}


export const getUserInfo = (token,uId) => {
  return dispatch => {
    dispatch(homePageStart());


    axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(res=>{
        //const {user,bill} = res.data;
        dispatch(gettingTransactions(token,uId));
        dispatch(gettingUserInfoSuccess(res.data.user, res.data.bill))
      })
  };
};



const gettingTransactionsStart = () => {
  return {
    type: actionTypes.GETTING_TRANSACTIONS_START,
  };
};

const gettingTransactionsSuccess = (incomes, expenses,all) => {
  return{
    type:actionTypes.GETTING_TRANSACTIONS_SUCCESS,
    incomes:incomes,
    expenses:expenses,
    transactions:all
  }
};

const gettingTransactionsFailed = (error) => {
  return{
    type:actionTypes.GETTING_TRANSACTIONS_FAILED,
    error:error
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

        const transactions = res.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

        dispatch(gettingTransactionsSuccess(incomes,expenses,transactions));



      })
      .catch(err=>{
        console.log(err)
        dispatch(gettingTransactionsFailed(err))
      });
  }

};
