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
} from '../actions/types';

const initialState = {
  article: {},
  articleList: [],
  articleListAll: [],
  articleListHot: [],
  articlePages: 0,
};
const defaultAction = { type: 'default' };
// TODO

/* eslint no-case-declarations: "error" */
/* eslint-env es6 */
export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case FETCH_ARTICLE: {
      return { ...state, article: action.article };
    }
    case CLEAR_ARTICLE: {
      return {
        ...state,
        article: {},
      };
    }
    case POST_ARTICLE: {
      return { ...state, article: action.article };
    }
    case EDIT_ARTICLE: {
      return { ...state, article: action.article };
    }
    case DELETE_ARTICLE: {
      return { ...state, article: {} };
    }
    case FETCH_ARTICLE_LIST: {
      return { ...state, articleList: action.articles, articlePages: action.page };
    }
    case CLEAR_ARTICLE_LIST: {
      return { ...state, articleList: [], articlePages: 0 };
    }
    case FETCH_ALL_BOARD: {
      return {
        ...state,
        articleListAll: action.articles,
      };
    }
    case CLEAR_ALL_BOARD: {
      return { ...state, articleListAll: [] };
    }
    case FETCH_HOT_BOARD: {
      return {
        ...state,
        articleListHot: action.articles,
      };
    }
    case CLEAR_HOT_BOARD: {
      return { ...state, articleListHot: [] };
    }
    case VOTE: {
      const updatedArticle = JSON.parse(JSON.stringify(state.article));
      updatedArticle.like = action.like;
      updatedArticle.dislike = action.dislike;
      return { ...state, article: updatedArticle };
    }
    default: {
      return state;
    }
  }
}
