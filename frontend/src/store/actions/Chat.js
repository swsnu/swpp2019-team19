import { SEND_QUESTION } from './types';
import axios from 'axios';

const remote_url = 'http://localhost:5500';

export const send = () => dispatch => {
  return axios.get(remote_url + '/chat').then(response => {
    dispatch({
      type: SEND_QUESTION,
      payload: response.data
    });
  });
};
