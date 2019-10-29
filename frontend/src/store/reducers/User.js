import Cookie from 'js-cookie';

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CHANGE_INFO,
} from '../actions/types';

const initialState = {};

// TODO
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      sessionStorage.setItem('sessionid', Cookie.get().sessionid);
      return state;
    }
    case SIGN_OUT: {
      sessionStorage.removeItem('sessionid');
      return state;
    }

    case SIGN_UP: {
      return state;
    }

    case CHANGE_INFO: {
      return state;
    }
    default: {
      return state;
    }
  }
}
