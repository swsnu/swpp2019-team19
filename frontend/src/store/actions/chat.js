import axios from 'axios';
import { SEND_QUESTION, RCV_QUESTION, CLEAR_CHAT_HISTORY } from './types';


export const getMessage = (response) => ({ type: RCV_QUESTION, message: response });

export const sendMessage = (message, sender) => (dispatch) => (
  axios.post(
    '/webhooksEng/rest/webhook', { message, sender },
  ).then((response) => {
    dispatch({
      type: SEND_QUESTION,
      message,
    });
    dispatch(getMessage(response.data));
  })
);

export const clearChatHistory = () => (dispatch) => (
  dispatch({ type: CLEAR_CHAT_HISTORY })
);
