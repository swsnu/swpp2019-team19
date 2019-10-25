import axios from 'axios';

import { push } from 'connected-react-router';
import {
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  POST_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  VOTE,
} from './types';

// csrf https://stackoverflow.com/questions/39254562/csrf-with-django-reactredux-using-axios
// TODO

export const fetchArticle = (id) => (dispatch) => axios.get(`/api/article/${id}/`).then((res) => {
  dispatch({
    type: FETCH_ARTICLE,
    article: res,
  });
  dispatch(push(`/articles/${res.data.id}`));
});

export const clearArticle = () => (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE });
};

export const postArticle = (article) => (dispatch) => axios.post('/api/article/', article).then((res) => {
  dispatch({
    type: POST_ARTICLE,
    article: res,
  });
  dispatch(push(`/articles/${res.data.id}`));
});


export const editArticle = (id, article) => (dispatch) => axios.put(`/api/article/${id}/`, article).then((res) => {
  dispatch({
    type: EDIT_ARTICLE,
    article: res,
  });
  dispatch(push(`/articles/${res.data.id}`));
});


export const deleteArticle = (id) => (dispatch) => axios.delete(`/api/article/${id}/`).then(() => {
  dispatch({
    type: DELETE_ARTICLE,
  });
  dispatch(push('/articles'));
});

export const fetchList = (req) => (dispatch) => axios.post('/api/boards/', req).then((res) => {
  dispatch({ type: FETCH_ARTICLE_LIST, articles: res });
});

export const clearList = () => (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE_LIST });
};

export const putVote = (req, id) => (dispatch) => axios.put(`/api/vote/${id}`, req).then((res) => {
  dispatch({
    type: VOTE,
    like: res.like,
    dislike: res.dislike,
  });
});
