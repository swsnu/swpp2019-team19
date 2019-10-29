
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
};

// TODO
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return { ...state, loggedIn: true };
    }
    case SIGN_OUT: {
      return { ...state, loggedIn: false };
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
