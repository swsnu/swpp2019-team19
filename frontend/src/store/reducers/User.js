import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_CREATE_FAIL,
  SIGN_UP_SUBMIT_FAIL,
  VALIDATE_USERNAME,
  VALIDATE_USER_ID,
  CHANGE_INFO,
  FETCH_USER,
  CLEAR_USER,
  CHANGE_INFO_WRONG_PASSWORD,
  CHANGE_INFO_DUPLICATE_NICKNAME,
} from '../actions/types';

const initialState = {
  user: { username: '', email: '', nickname: '' },
  isSuper: false,
  signinFail: false,
  signupCreateFail: false,
  signupSubmitFail: false,
  loadingUser: true,
  changeInfoWrongPassword: false,
  changeInfoDupNickname: false,
  changeInfoSuccess: false,
};

const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case SIGN_IN_FAIL: {
      return { ...state, signinFail: true };
    }
    case SIGN_UP_CREATE_FAIL: {
      return { ...state, signupCreateFail: true, signupSubmitFail: false };
    }
    case SIGN_UP_SUBMIT_FAIL: {
      return { ...state, signupCreateFail: false, signupSubmitFail: true };
    }
    case SIGN_UP: {
      return {
        ...state, signupCreateFail: false, signupSubmitFail: false, signinFail: false,
      };
    }
    case CHANGE_INFO_WRONG_PASSWORD: {
      return {
        ...state,
        changeInfoWrongPassword: true,
        changeInfoDupNickname: false,
        changeInfoSuccess: false,
      };
    }
    case CHANGE_INFO_DUPLICATE_NICKNAME: {
      return {
        ...state,
        changeInfoWrongPassword: false,
        changeInfoDupNickname: true,
        changeInfoSuccess: false,
      };
    }
    case CHANGE_INFO: {
      return {
        ...state,
        changeInfoWrongPassword: false,
        changeInfoDupNickname: false,
        changeInfoSuccess: true,
      };
    }
    case FETCH_USER: {
      return {
        ...state,
        loadingUser: false,
        user: action.user,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        loadingUser: true,
        user: {},
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        loadingUser: true,
        changeInfoWrongPassword: false,
        changeInfoDupNickname: false,
        changeInfoSuccess: false,
        signinFail: false,
        signupCreateFail: false,
        signupSubmitFail: false,
        isSuper: action.isSuper,
      };
    }
    case SIGN_OUT:
    case VALIDATE_USERNAME:
    case VALIDATE_USER_ID:
    default:
      return {
        ...state,
        loadingUser: true,
        changeInfoWrongPassword: false,
        changeInfoDupNickname: false,
        changeInfoSuccess: false,
        signinFail: false,
        signupCreateFail: false,
        signupSubmitFail: false,
      };
  }
}
