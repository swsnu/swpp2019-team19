import {
  POST_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  VOTE,
} from '../actions/types';

const initialState = {
  article: {},
  articleAck: false,
  articleList: [],
  articleListAck: false,
};

// TODO

/* eslint no-case-declarations: "error" */
/* eslint-env es6 */
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLE: {
      return { ...state, article: action.article, articleAck: true };
    }
    case CLEAR_ARTICLE: {
      return {
        ...state, article: {}, articleAck: false,
      };
    }
    case POST_ARTICLE: {
      return { ...state, article: action.article };
    }
    case EDIT_ARTICLE: {
      return { ...state, article: action.article };
    }
    case DELETE_ARTICLE: {
      return { ...state, article: {}, articleAck: false };
    }
    case FETCH_ARTICLE_LIST: {
      return { ...state, articleList: action.articles, articleListAck: true };
    }
    case CLEAR_ARTICLE_LIST: {
      return { ...state, articleList: [], articleListAck: false };
    }
    case VOTE: {
      const updatedArticle = state.article;
      updatedArticle.like = action.like;
      updatedArticle.dislike = action.dislike;
      return { ...state, article: updatedArticle };
    }
    default: {
      return state;
    }
  }
}
