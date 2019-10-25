import axios from 'axios';

import { push } from 'connected-react-router';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CHANGE_INFO,
} from './types';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// TODO
export const signin = (userInfo) => (dispatch) => axios.post('api/signin/', userInfo).then((res) => {
  dispatch({
    type: SIGN_IN,
    sessionID: res.headers.sessionID,
  });
});

export const signout = () => (dispatch) => {
  axios.post('api/signout/').then(() => {
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
