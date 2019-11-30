import axios from 'axios';

import {
  FETCH_COMMENT,
  CLEAR_COMMENT,
  // DELETE_COMMENT,
  POST_COMMENT,
  EDIT_COMMENT,
} from './types';


export const fetchComment = (id) => (dispatch) => (
  axios.get(`/api/comment/${id}/`).then((res) => {
    dispatch({
      comment: res.data,
      type: FETCH_COMMENT,
    });
  })
);

export const clearComment = () => (dispatch) => (
  dispatch({ type: CLEAR_COMMENT })
);

export const postComment = (articleId, content) => (dispatch) => (
  axios.post(`/api/comment/${articleId}/`, {
    content,
  }).then((res) => {
    dispatch({
      comment: res.data,
      type: POST_COMMENT,
    });
  })
);

export const editComment = (articleId, commentId, content) => (dispatch) => (
  axios.put(`/api/comment/${articleId}/`, {
    commentId, content,
  }).then(() => {
    dispatch({
      id: commentId,
      comment: content,
      type: EDIT_COMMENT,
    });
  })
);

// export const deleteComment = (id) => (dispatch) => (
//   axios.delete(`${remoteURL}/api/comment/${id}/`).then((res) => {
//     const article_id = res;
//     fetchComment(articleId);
//     // dispatch({
//     //   type: DELETE_COMMENT,
//     //   deleted_id: id,
//     // })
//   })
// )
