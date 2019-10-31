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
    case SIGN_IN:
    case SIGN_OUT:
    case SIGN_UP:
    case CHANGE_INFO:
    default: {
      return state;
    }
  }
}
