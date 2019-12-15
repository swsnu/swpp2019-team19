/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './user';
import store from '../store';
// promise reject가 401 status를 받는 상황인지?

const stubUser = {
  username: 'test1',
  nickname: 'testnick',
  email: 'test@email.com',
  super: false,
};

const status200 = new Promise((resolve) => {
  const result = {
    status: 200,
  };
  resolve(result);
});
const status401 = new Promise((resolve, reject) => {
  const result = {
    response: {
      status: 401,
    },
  };
  reject(result);
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
    const spyFetch = jest.spyOn(axios, 'get').mockImplementation(
      () => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.signin()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyFetch).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'signin' should catch 401 error", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (username, password) => status401,
    );
    const spyFetch = jest.spyOn(axios, 'get').mockImplementation(
      () => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.signin()).then(() => {
      const newState = store.getState();
      expect(newState.user.signinFail).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyFetch).not.toHaveBeenCalled();
      done();
    });
  });

  it("'signout' should post correctly", (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      () => status200,
    );

    store.dispatch(actionCreators.signout());
    expect(spy).toHaveBeenCalledTimes(1);

    done();
  });

  it("'signup' should post User info correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (email, username, password) => new Promise((resolve) => {
        const result = {
          status: 201,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.signup());
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it('signup create fail', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (email, username, nickname, password) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 409,
          },
        };
        reject(result);
      }),
    );

    store.dispatch(actionCreators.signup('email', 'username', 'nickname', 'password')).then(() => {
      const newState = store.getState();
      expect(newState.user.signupCreateFail).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('signup submit fail', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (email, username, password) => new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 400,
          },
        };
        reject(result);
      }),
    );

    store.dispatch(actionCreators.signup('email', 'username', 'password')).then(() => {
      const newState = store.getState();
      expect(newState.user.signupSubmitFail).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('changeInfo should change account informations', (done) => {
    const spy = jest
      .spyOn(axios, 'put')
      .mockImplementation(
        (username, newnickname, newemail, currentPassword, newPassword) => status200,
      );

    store.dispatch(actionCreators.changeInfo());
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it('changeInfo failed to change', (done) => {
    const spy = jest
      .spyOn(axios, 'put')
      .mockImplementation(
        (username, newnickname) => status401,
      );
    store.dispatch(actionCreators.changeInfo('email', 'username', 'password'))
      .then(() => {
        const newState = store.getState();
        expect(newState.user.changeInfoWrongPassword).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('fectch user informations', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }),
    );
    store.dispatch(actionCreators.fetchUser()).then(() => {
      const newState = store.getState();
      expect(newState.user.user).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('clear user informations', (done) => {
    store.dispatch(actionCreators.clearUser());
    const newState = store.getState();
    expect(Object.keys(newState.user.user).length).toBe(0);
    done();
  });
});
