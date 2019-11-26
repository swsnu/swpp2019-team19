/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './chat';
import store from '../store';

const stubChat = {
  message: 'hi',
  sender: 'default',
};
const stubResponse = [
  {
    text: 'hi',
  },
  {
    image: 'hi',
  },
];


describe('action chat', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sendMessage', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (response) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubResponse,
        };

        resolve(result);
      }),
    );

    store.dispatch(actionCreators.sendMessage(stubChat)).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('clear chat history', (done) => {
    store.dispatch(actionCreators.clearChatHistory());
    const newState = store.getState();
    expect(newState.chat.chatHistory.length).toBe(0);
    done();

  })
});
