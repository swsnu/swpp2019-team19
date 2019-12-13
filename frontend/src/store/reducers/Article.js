import {
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  POST_ARTICLE,
  EDIT_ARTICLE,
  EDIT_ARTICLE_TAG,
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

const replace = (list, newArticle) => {
  const index = list.findIndex(
    (article) => article.id === newArticle.id,
  );
  if (index < 0) {
    return list;
  }
  const head = list.slice(0, index);
  const tail = list.slice(index + 1);
  const newArticleList = head.concat(newArticle).concat(tail);
  return newArticleList;
};

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
      const newArticle = action.article;
      const newArticleList = [newArticle].concat(state.articleList);
      newArticleList.pop();
      return {
        ...state,
        article: newArticle,
        articleList: newArticleList,
      };
    }
    case EDIT_ARTICLE_TAG:
    case EDIT_ARTICLE: {
      const newArticle = action.article;
      newArticle.vote_diff = newArticle.like - newArticle.dislike;

      const newList = replace(state.articleList, newArticle);
      const newHotList = replace(state.articleListHot, newArticle);
      const newAllList = replace(state.articleListAll, newArticle);

      return {
        ...state,
        article: newArticle,
        articleList: newList,
        articleListHot: newHotList,
        articleListAll: newAllList,
      };
    }
    case DELETE_ARTICLE: {
      return { ...state, article: {} };
    }
    case FETCH_ARTICLE_LIST: {
      return {
        ...state, articleList: action.articles, articlePages: action.page,
      };
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
      const updatedArticleList = JSON.parse(JSON.stringify(state.articleList));
      const updatedArticleListAll = JSON.parse(JSON.stringify(state.articleListAll));
      const updatedArticleListHot = JSON.parse(JSON.stringify(state.articleListHot));
      if (updatedArticleList.filter((article) => article.id === action.id).length !== 0) {
        updatedArticleList.filter((article) => article.id === action.id)[0]
          .vote_diff = action.like - action.dislike;
      }
      if (updatedArticleListAll.filter((article) => article.id === action.id).length !== 0) {
        updatedArticleListAll.filter((article) => article.id === action.id)[0]
          .vote_diff = action.like - action.dislike;
      }
      if (updatedArticleListHot.filter((article) => article.id === action.id).length !== 0) {
        updatedArticleListHot.filter((article) => article.id === action.id)[0]
          .vote_diff = action.like - action.dislike;
      }
      const updatedArticle = JSON.parse(JSON.stringify(state.article));
      updatedArticle.like = action.like;
      updatedArticle.dislike = action.dislike;
      return {
        ...state,
        article: updatedArticle,
        articleList: updatedArticleList,
        articleListAll: updatedArticleListAll,
        articleListHot: updatedArticleListHot,
      };
    }
    default: {
      return state;
    }
  }
}
