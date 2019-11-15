import axios from 'axios';

import {
  FETCH_COMMENT,
  CLEAR_COMMENT,
  // DELETE_COMMENT,
  POST_COMMENT,
} from './types';

const remoteURL = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const fetchComment = (id) => (dispatch) => (
  axios.get(`${remoteURL}/api/comment/${id}/`).then((res) => {
    dispatch({
      comment: res.data,
      type: FETCH_COMMENT,
    });
  })
);

export const clearComment = () => (dispatch) => (
  dispatch({ type: CLEAR_COMMENT })
);

export const postComment = (id, content) => (dispatch) => (
  axios.post(`${remoteURL}/api/comment/${id}/`, { content }).then((res) => {
    dispatch({
      comment: res.data,
      type: POST_COMMENT,
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
