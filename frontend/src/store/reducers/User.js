import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_FAIL,
  VALIDATE_USERNAME,
  VALIDATE_USER_ID,
  CHANGE_INFO,
  FETCH_USER,
  CHANGE_INFO_FAIL,
} from '../actions/types';

const initialState = {
  user: {},
  signinFail: false,
  signupFail: false,
  changeInfoFail: false,
};

const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case SIGN_IN_FAIL: {
      return { ...state, signinFail: true };
    }
    case SIGN_UP_FAIL: {
      return { ...state, signupFail: true };
    }
    case SIGN_UP: {
      return {
        ...state, signupFail: false, signinFail: false,
      };
    }
    case SIGN_IN:
    case SIGN_OUT:
    case VALIDATE_USERNAME:
    case VALIDATE_USER_ID:
    case CHANGE_INFO_FAIL: {
      return { ...state, changeInfoFail: true };
    }
    case CHANGE_INFO: {
      return { ...state, changeInfoFail: false };
    }
    case FETCH_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return {
        ...state, changeInfoFail: false, signinFail: false, signupFail: false,
      };
  }
}
