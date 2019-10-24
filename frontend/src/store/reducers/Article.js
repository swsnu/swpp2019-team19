import {
  POST_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  FETCH_ARTICLE_THUMBNAIL,
  CLEAR_ARTICLE_THUMBNAIL,
  FETCH_ARTICLE_LIST,
  CLEAR_ARTICLE_LIST,
  FETCH_ARTICLE,
  CLEAR_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
} from '../actions/types';

const initialState = {
  article: {},
  articleAck: false,
  articleList: [],
  articleListAck: false
};

// TODO
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_ARTICLE:
      return state;
    case EDIT_ARTICLE:
      return state;
    case DELETE_ARTICLE:
      return state;
    case FETCH_ARTICLE_THUMBNAIL:
      return state;
    case CLEAR_ARTICLE_THUMBNAIL:
      return state;
    case FETCH_ARTICLE_LIST:
      return state;
    case CLEAR_ARTICLE_LIST:
      return state;
    case FETCH_ARTICLE:
      return state;
    case CLEAR_ARTICLE:
      return state;
    case LIKE_ARTICLE:
      return state;
    case DISLIKE_ARTICLE:
      return state;
    default:
      return state;
  }
}
