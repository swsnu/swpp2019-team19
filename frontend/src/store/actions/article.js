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
import getCookie from './CSRF';

const remoteURL = 'http://localhost:8000';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

/*
const getToken = axios.get('/api/token/');
const { csrftoken } = getToken.data;
*/
// csrf https://stackoverflow.com/questions/39254562/csrf-with-django-reactredux-using-axios
// TODO
export const fetchArticle = (id) => (dispatch) => axios.get(`/api/article/${id}/`).then((res) => {
  dispatch({
    type: FETCH_ARTICLE,
    article: res.data,
  });
});

export const clearArticle = () => (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE });
};

export const postArticle = (title, content) => (dispatch) => axios.post('/api/article/', { title, content }).then((res) => {
  dispatch({
    type: POST_ARTICLE,
    article: res.data,
  });
  dispatch(push(`/articles/${res.data.id}`));
});


export const editArticle = (id, title, content) => (dispatch) => axios.put(`/api/article/${id}/`, { title, content }).then((res) => {
  dispatch({
    type: EDIT_ARTICLE,
    article: res.data,
  });
  dispatch(push(`/articles/${res.data.id}`));
});


export const deleteArticle = (id) => (dispatch) => axios.delete(`/api/article/${id}/`).then(() => {
  dispatch({
    type: DELETE_ARTICLE,
  });
  dispatch(push('/articles'));
});

export const fetchList = (articleCount, boardName, tag) => (dispatch) => axios.post('/api/boards/', { tag, article_count: articleCount, board_name: boardName }).then((res) => {
  dispatch({ type: FETCH_ARTICLE_LIST, articles: res.data });
});

export const clearList = () => (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE_LIST });
};

export const putVote = (vote, id) => (dispatch) => axios.put(`/api/vote/${id}`, { id, vote }).then((res) => {
  dispatch({
    type: VOTE,
    like: res.data.like,
    dislike: res.data.dislike,
  });
});
