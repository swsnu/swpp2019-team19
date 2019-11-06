
import axios from 'axios';
import { SEND_QUESTION, RCV_QUESTION } from './types';

const remoteURL = 'http://localhost:5005';

export const sendMessage = (message, sender) => (dispatch) => (
  // new Promise((resolve, _reject) => {
  //   resolve(
  //     dispatch({
  //       type: SEND_QUESTION,
  //       message: message,
  //     })
  //   );
  // });
  axios.post(`${remoteURL}/webhooks/rest/webhook`, { message, sender }).then((response) => {
    dispatch({
      type: RCV_QUESTION,
      message: response,
    });
  })
);
