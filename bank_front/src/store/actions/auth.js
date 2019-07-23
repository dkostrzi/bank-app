import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../utils/api';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, email,expires) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    email: email,
    expires:expires
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
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
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn);
        dispatch(authSuccess(res.data.token, res.data.uId, res.data.email,expirationDate));
      }).catch(err => {

      dispatch(authFailed(err.response.data.error));
    });
  };
};
