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
  articleAck: false,
  articleList: [],
  articleListAck: false,
  articleListAll: [],
  articleListAllAck: false,
  articleListHot: [],
  articleListHotAck: false,
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
    case FETCH_ALL_BOARD: {
      return { ...state, articleListAll: action.articles, articleListAllAck: true };
    }
    case CLEAR_ALL_BOARD: {
      return { ...state, articleListAll: [], articleListAllAck: false };
    }
    case FETCH_HOT_BOARD: {
      return { ...state, articleListHot: action.articles, articleListHotAck: true };
    }
    case CLEAR_HOT_BOARD: {
      return { ...state, articleListHot: [], articleListHotAck: false };
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
