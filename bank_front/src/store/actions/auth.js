import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../utils/api';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};


export const auth = (login, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      login: login,
      password: password,
    };

    axios.post(`${API_URL}/login`, authData)
      .then(res => {
        console.log(res.data);

        dispatch(authSuccess(res.data.token, res.data.userId));
      });
  };
};
