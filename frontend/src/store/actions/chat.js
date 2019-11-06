
import axios from 'axios';
import { SEND_QUESTION } from './types';

const remoteURL = 'http://localhost:5005';

export const sendMessage = (message, sender) => (dispatch) => axios.post(`${remoteURL}/webhooks/rest/webhook`, { message, sender }).then((response) => {
  dispatch({
    type: SEND_QUESTION,
    userMessage: message,
    botMessage: response,
  });
});

