import {
  FETCH_COMMENT,
  CLEAR_COMMENT,
  DELETE_COMMENT,
  POST_COMMENT,
  EDIT_COMMENT,
} from '../actions/types';

const initialState = {
  commentList: [],
};
const defaultAction = { type: 'default' };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case FETCH_COMMENT: {
      return { ...state, commentList: action.comment };
    }
    case CLEAR_COMMENT: {
      return { ...state, commentList: [] };
    }
    case DELETE_COMMENT: {
      const delCommentId = action.deletedCommentId;
      const index = state.commentList.findIndex(
        (comment) => comment.id === delCommentId,
      );
      const head = state.commentList.slice(0, index);
      const tail = state.commentList.slice(index + 1);
      const newCommentList = head.concat(tail);
      return { ...state, commentList: newCommentList };
    }
    case POST_COMMENT: {
      return { ...state, commentList: action.comment };
    }
    case EDIT_COMMENT: {
      const commentId = action.id;
      const index = state.commentList.findIndex(
        (comment) => comment.id === commentId,
      );
      const head = state.commentList.slice(0, index);
      const edit = state.commentList.slice(index, index + 1);
      edit[0].content = action.comment;
      const tail = state.commentList.slice(index + 1);
      const newCommentList = head.concat(edit).concat(tail);
      return { ...state, commentList: newCommentList };
    }
    default: {
      return state;
    }
  }
}
