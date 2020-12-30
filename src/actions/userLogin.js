import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOADING,
} from './actionTypes';
import config from '../config/index.js';

export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const login = ({ emailId, password }) => {
  return dispatch => {
    dispatch({ type: LOADING });
    fetch(config.baseurl + '/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: emailId,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.debug(res);
        const user = res;
        if (res.errorMessage) {
          dispatch({ type: LOGIN_FAILURE, payload: res.errorMessage });
        } else {
          dispatch({ type: LOGIN_SUCCESS, payload: user });
        }
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: LOGIN_FAILURE });
      });
  };
};
