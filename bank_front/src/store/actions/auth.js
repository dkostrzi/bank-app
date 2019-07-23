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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
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

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userId', res.data.uId);

        dispatch(authSuccess(res.data.token, res.data.uId, res.data.email,expirationDate));
      }).catch(err => {

      dispatch(authFailed(err.response.data.error));
    });
  };
};


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
       dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        dispatch(authSuccess(token, userId,email,expirationDate));
       // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000) )
      }

    }
  };
};
