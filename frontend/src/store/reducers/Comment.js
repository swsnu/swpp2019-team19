import {
  FETCH_COMMENT,
  CLEAR_COMMENT,
  // DELETE_COMMENT,
  POST_COMMENT,
} from '../actions/types';

const initialState = {
  commentList: [],
  commentAck: false,
};
const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case FETCH_COMMENT: {
      return { ...state, commentList: action.comment, commentAck: true };
    }
    case CLEAR_COMMENT: {
      return { ...state, commentList: [], commentAck: false };
    }
    // case DELETE_COMMENT: {
    //   deleted_id = action.deleted_id;
    //   return {}
    // }
    case POST_COMMENT: {
      return { ...state, commentList: action.comment };
    }
    default: {
      return state;
    }
  }
}
