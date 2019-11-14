import axios from 'axios';

import { push } from 'connected-react-router';
import {
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  POST_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ALL_BOARD,
  FETCH_HOT_BOARD,
  CLEAR_ALL_BOARD,
  CLEAR_HOT_BOARD,
  FETCH_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  VOTE,
} from './types';


const remoteURL = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const fetchArticle = (id) => (dispatch) => (
  axios.get(`${remoteURL}/api/article/${id}/`).then((res) => {
    dispatch({
      article: res.data,
      type: FETCH_ARTICLE,
    });
  })
);

export const clearArticle = () => (dispatch) => (
  dispatch({ type: CLEAR_ARTICLE })
);

export const postArticle = (title, content) => (dispatch) => (
  axios.post(`${remoteURL}/api/article/`, { title, content }).then((res) => {
    dispatch({
      type: POST_ARTICLE,
      article: res.data,
    });
    dispatch(push(`/boards/all/${res.data.id}`));
  })
);

export const editArticle = (id, title, content) => (dispatch) => (
  axios.put(`${remoteURL}/api/article/${id}/`, { title, content }).then((res) => {
    dispatch({
      type: EDIT_ARTICLE,
      article: res.data,
    });
    dispatch(push('/boards'));
  })
);

export const deleteArticle = (id) => (dispatch) => (
  axios.delete(`${remoteURL}/api/article/${id}/`).then(() => {
    dispatch({
      type: DELETE_ARTICLE,
    });
    dispatch(push('/articles'));
  })
);

export const fetchAllBoard = (options) => (dispatch) => (
  axios.post(`${remoteURL}/api/boards/`, options).then((res) => {
    dispatch({ type: FETCH_ALL_BOARD, articles: res.data[1] });
  })
);

export const clearAllBoard = () => (dispatch) => (
  dispatch({ type: CLEAR_ALL_BOARD })
);

export const fetchHotBoard = (options) => (dispatch) => (
  axios.post(`${remoteURL}/api/boards/`, options).then((res) => {
    dispatch({ type: FETCH_HOT_BOARD, articles: res.data[1] });
  })
);

export const clearHotBoard = () => (dispatch) => (
  dispatch({ type: CLEAR_HOT_BOARD })
);

export const fetchArticleList = (options) => (dispatch) => (
  axios.post(`${remoteURL}/api/boards/`, options).then((res) => {
    dispatch({ type: FETCH_ARTICLE_LIST, page: res.data[0], articles: res.data[1] });
  })
);

export const clearArticleList = () => (dispatch) => (
  dispatch({ type: CLEAR_ARTICLE_LIST })
);

export const putVote = (vote, id) => (dispatch) => (
  axios.put(`${remoteURL}/api/vote/${id}/`, { id, vote }).then((res) => {
    dispatch({
      type: VOTE,
      like: res.data.like,
      dislike: res.data.dislike,
    });
  })
);
