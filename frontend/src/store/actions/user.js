import axios from 'axios';
import { push } from 'connected-react-router';
import Cookie from 'js-cookie';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CHANGE_INFO,
} from './types';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
/*
axios.interceptors.response.use((response) => {
  const sessionCookie = Cookie.get();
  console.log('Cookie', sessionCookie);
  return response;
}); */
// TODO
export const signin = (username, password) => (dispatch) => {
  axios.post('/api/signin/', { username, password }).then((res) => {
    if (res.status === 204) {
      sessionStorage.setItem('sessionid', Cookie.get().sessionid);
      dispatch({
        type: SIGN_IN,
      });
      dispatch(push('/boards'));
    }
  }, (error) => {
    if (error.response.status === 401) {
      /* eslint-disable no-alert */
      alert('username or password is wrong');
      /* eslint-disable no-alert */
    }
  });
};

export const signout = () => (dispatch) => {
  axios.get('/api/signout/').then(() => {
    sessionStorage.removeItem('sessionid');
    dispatch({ type: SIGN_OUT });
  });
};

export const signup = (email, username, password) => (dispatch) => {
  axios.post('/api/signup/', { username, email, password }).then(() => {
    dispatch({
      type: SIGN_UP,
    });
  });
};

export const changeInfo = (username, currentPassword, newPassword) => (dispatch) => {
  axios.put('/api/signup/', { username, current_password: currentPassword, new_password: newPassword }).then(() => {
    dispatch({
      type: CHANGE_INFO,
    });
  });
};
