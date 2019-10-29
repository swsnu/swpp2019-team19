import axios from 'axios';
import Cookie from 'js-cookie';
import { push } from 'connected-react-router';
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
export const signin = (username, password) => (dispatch) => axios.post('/api/signin/', { username, password }).then((res) => {
  if (res.status === 204) {
    dispatch({
      type: SIGN_IN,
      checker: res,
    });
    dispatch(push('/boards'));
  }
}, (error) => {
  if (error.response.status === 401) {
    alert('username or password is wrong');
  }
});

export const signout = () => (dispatch) => {
  axios.post('/api/signout/').then(() => {
    dispatch({ type: SIGN_OUT });
  });
};

export const signup = (email, username, password) => (dispatch) => axios.post('/api/signup/', { username, email, password }).then((res) => {
  dispatch({
    type: SIGN_UP,
  });
  // dispatch(push(`/articles/${res.data.id}`));
});

export const changeInfo = (username, currentPassword, newPassword) => (dispatch) => axios.post('/api/signup/', { username, current_password: currentPassword, new_password: newPassword }).then((res) => {
  dispatch({
    type: CHANGE_INFO,
  });
  // dispatch(push(`/articles/${res.data.id}`));
});
