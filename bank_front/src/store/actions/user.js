import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../utils/api';


export const homePageStart = () => {
  return {
    type: actionTypes.HOMEPAGE_START,
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


export const getUserInfo = (token) => {
  return dispatch => {
    dispatch(homePageStart());


    axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(res=>{
        dispatch(gettingUserInfoSuccess(res.data.user, res.data.bill))
      })
  };
};
