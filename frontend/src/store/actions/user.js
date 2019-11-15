import axios from 'axios';
import { push } from 'connected-react-router';
import Cookie from 'js-cookie';
import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_FAIL,
  CHANGE_INFO,
  FETCH_USER,
  CHANGE_INFO_FAIL,
} from './types';

const remoteURL = 'http://localhost:8000';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const signin = (username, password) => (dispatch) => (
  axios.post(`${remoteURL}/api/signin/`, { username, password }).then(() => {
    sessionStorage.setItem('sessionid', Cookie.get().sessionid);
    sessionStorage.setItem('username', username);
    dispatch({
      type: SIGN_IN,
    });
    dispatch(push('/boards'));
  }, (error) => {
    if (error.response.status === 401) {
      dispatch({
        type: SIGN_IN_FAIL,
      });
    }
  })
);

export const signout = () => (dispatch) => (
  axios.get(`${remoteURL}/api/signout/`).then(() => {
    sessionStorage.removeItem('sessionid');
    sessionStorage.removeItem('username');
    dispatch({ type: SIGN_OUT });
  })
);

export const signup = (email, username, password) => (dispatch) => (
  axios.post(`${remoteURL}/api/signup/`, { username, email, password }).then(() => {
    dispatch({
      type: SIGN_UP,
    });
    dispatch(push('/signin'));
  }, (error) => {
    if (error.response.status === 409) {
      dispatch({
        type: SIGN_UP_FAIL,
      });
    }
  })
);

// eslint-disable-next-line max-len
export const changeInfo = (username, newnickname, newemail, currentPassword, newPassword) => (dispatch) => (
  axios.put(`${remoteURL}/api/account/`, {
    // eslint-disable-next-line object-shorthand
    username,
    new_nickname: newnickname,
    new_email: newemail,
    current_password: currentPassword,
    new_password: newPassword,
  }).then(() => {
    dispatch({
      type: CHANGE_INFO,
    });
  }, (error) => {
    if (error.response.status === 401 || error.response.status === 400) {
      dispatch({
        type: CHANGE_INFO_FAIL,
      });
      dispatch(push('/account'));
    }
  })
);

export const fetchUser = () => (dispatch) => (
  axios.get(`${remoteURL}/api/account/`).then((res) => {
    dispatch({
      username: res.data.username,
      nickname: res.data.nickname,
      email: res.data.email,
      user: res.data,
      type: FETCH_USER,
    });
  })
);
