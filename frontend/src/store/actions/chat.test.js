/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './chat';
import store from '../store';

const stubEngChat = {
  message: 'hi',
  sender: 'default',
};
const stubKorChat = {
  message: '안녕',
  sender: 'default',
};
const stubEngResponse = [
  {
    text: 'hi',
  },
  {
    image: 'hi',
  },
];
const stubKorResponse = [
  {
    text: '안녕',
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
          data: stubEngResponse,
        };

        resolve(result);
      }),
    );

    store.dispatch(actionCreators.sendMessage(stubEngChat, 'Eng')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('sendKorMessage', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (response) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubKorResponse,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.sendMessage(stubKorChat, 'Kor')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('clear chat history', (done) => {
    store.dispatch(actionCreators.clearChatHistory());
    const newState = store.getState();
    expect(newState.chat.chatHistory.length).toBe(0);
    done();
  });
});
