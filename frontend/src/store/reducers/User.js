
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CHANGE_INFO,
} from '../actions/types';

const initialState = {
  sessionID: {},
  loggedIn: false,
  loginAck: false,
  checker: '',
};

// TODO
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return { ...state, checker: action.checker, loggedIn: true };
    }
    case SIGN_OUT: {
      return state;
    }

    case SIGN_UP: {
      return state;
    }

    case CHANGE_INFO: {
      return state;
    }

    default:
      return state;
  }
}
