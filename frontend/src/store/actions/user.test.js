/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './user';
import store from '../store';
// promise reject가 401 status를 받는 상황인지?

const status200 = new Promise((resolve) => {
  const result = {
    status: 200,
  };
  resolve(result);
});

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("'signin' should post Users correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (username, password) => new Promise((resolve) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.signin()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'signin' should catch 410 error", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (username, password) => new Promise((resolve) => {
        const result = {
          status: 401,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.signin()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'signout' should post correctly", (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => status200);

    store.dispatch(actionCreators.signout());
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it("'signup' should post User info correctly", (done) => {
    const spy = jest
      .spyOn(axios, 'post')
      .mockImplementation(
        (username, currentPassword, newPassword) => status200,
      );

    store.dispatch(actionCreators.signup());
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it("'changeInfo' should post User info correctly", (done) => {
    const spy = jest
      .spyOn(axios, 'put')
      .mockImplementation(
        (username, currentPassword, newPassword) => status200,
      );

    store.dispatch(actionCreators.changeInfo());
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });
});
