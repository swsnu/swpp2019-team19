import axios from 'axios';
import { push } from 'connected-react-router';
import Cookie from 'js-cookie';
import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_CREATE_FAIL,
  SIGN_UP_SUBMIT_FAIL,
  CHANGE_INFO,
  FETCH_USER,
  CLEAR_USER,
  CHANGE_INFO_WRONG_PASSWORD,
  CHANGE_INFO_DUPLICATE_NICKNAME,
} from './types';

export const fetchUser = () => (dispatch) => (
  axios.get('/api/account/').then((res) => {
    sessionStorage.setItem('nickname', res.data.nickname);
    dispatch({
      username: res.data.username,
      nickname: res.data.nickname,
      email: res.data.email,
      user: res.data,
      type: FETCH_USER,
    });
  })
);

export const signin = (username, password) => (dispatch) => (
  axios.post('/api/signin/', { username, password }).then(() => {
    sessionStorage.setItem('sessionid', Cookie.get().sessionid);
    sessionStorage.setItem('username', username);
    axios.get('/api/account/').then((res) => {
      sessionStorage.setItem('nickname', res.data.nickname);
      dispatch({
        type: SIGN_IN,
        isSuper: res.data.super,
      });
      dispatch(push('/boards'));
    });
  }, (error) => {
    if (error.response.status === 401) {
      dispatch({
        type: SIGN_IN_FAIL,
      });
    }
  })
);

export const signout = () => (dispatch) => {
  sessionStorage.removeItem('sessionid');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('nickname');
  axios.get('/api/signout/').then(() => {
    dispatch({ type: SIGN_OUT });
  });
};

export const signup = (email, username, nickname, password) => (dispatch) => (
  axios.post(
    '/api/signup/',
    {
      username, email, nickname, password,
    },
  ).then(() => {
    dispatch({
      type: SIGN_UP,
    });
  }, (error) => {
    if (error.response.status === 409) {
      dispatch({
        type: SIGN_UP_CREATE_FAIL,
      });
    } else if (error.response.status === 400) {
      dispatch({
        type: SIGN_UP_SUBMIT_FAIL,
      });
    }
  })
);

export const changeInfo = (
  username, newNickname, newEmail, currentPassword, newPassword,
) => (dispatch) => (
  axios.put('/api/account/', {
    username,
    new_nickname: newNickname,
    new_email: newEmail,
    current_password: currentPassword,
    new_password: newPassword,
  }).then(() => {
    dispatch({
      type: CHANGE_INFO,
    });
  }, (error) => {
    if (error.response.status === 403) {
      dispatch({
        type: CHANGE_INFO_DUPLICATE_NICKNAME,
      });
    } else if (error.response.status === 401
      || error.response.status === 400) {
      dispatch({
        type: CHANGE_INFO_WRONG_PASSWORD,
      });
    }
  })
);

export const clearUser = () => (dispatch) => {
  sessionStorage.removeItem('sessionid');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('nickname');
  return dispatch({ type: CLEAR_USER });
};
