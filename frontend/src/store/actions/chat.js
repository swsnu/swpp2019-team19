import axios from 'axios';
import { SEND_QUESTION, RCV_QUESTION } from './types';

const remoteURL = 'http://localhost:5005';

export const getMessage = (response) => ({ type: RCV_QUESTION, message: response });


export const sendMessage = (message, sender) => (dispatch) => (
  axios.post(`${remoteURL}/webhooks/rest/webhook`, { message, sender }).then((response) => {
    dispatch({
      type: SEND_QUESTION,
      message,
    });
    dispatch(getMessage(response.data));
  })
);
