import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  VALIDATE_USERNAME,
  VALIDATE_USER_ID,
  CHANGE_INFO
} from '../actions/types';

const initialState = {
  sessionID: {},
  loggedIn: false,
  loginAck: false,
  usernameValidated: false,
  userIDValidated: false
};

// TODO
export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return state;
    }
    case SIGN_OUT: {
      return state;
    }

    case SIGN_UP: {
      return state;
    }

    case VALIDATE_USERNAME: {
      return state;
    }

    case VALIDATE_USER_ID: {
      return state;
    }

    case CHANGE_INFO: {
      return state;
    }

    default:
      return state;
  }
}
