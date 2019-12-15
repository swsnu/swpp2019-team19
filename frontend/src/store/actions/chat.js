import axios from 'axios';
import {
  SEND_QUESTION, RCV_QUESTION, CLEAR_CHAT_HISTORY, CHAT_CATEGORY,
} from './types';

export const getMessage = (response) => ({
  type: RCV_QUESTION, message: response,
});

export const sendMessage = (message, language) => (dispatch) => {
  const sender = document.cookie.slice(-20);
  return axios.post(
    `/webhooks${language}/rest/webhook`, { message, sender },
  ).then((response) => {
    dispatch({
      type: SEND_QUESTION,
      message,
    });
    dispatch(getMessage(response.data));
  });
};

export const clearChatHistory = () => (dispatch) => (
  dispatch({ type: CLEAR_CHAT_HISTORY })
);

export const fetchCategory = () => (dispatch) => {
  axios.get('/api/category/').then((res) => {
    dispatch({
      category: res.data,
      type: CHAT_CATEGORY,
    });
  });
};
