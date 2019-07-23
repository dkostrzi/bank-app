import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  expires:null,
  loading: false,
  email: null,
  authRedirectPath: '/',
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    email: action.email,
    expires:action.expires,
    error: null,
    loading: false,
  };
};

const authFailed = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading:false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
