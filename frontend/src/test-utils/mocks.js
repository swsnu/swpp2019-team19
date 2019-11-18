import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { history } from '../store/store';

const getMockArticleReducer = jest.fn(
  (initialState) => (state = initialState) => state,
);

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState) => state,
);

const getMockChatReducer = jest.fn(
  (initialState) => (state = initialState) => state,
);

const getMockCommentReducer = jest.fn(
  (initialState) => (state = initialState) => state,
);

// eslint-disable-next-line no-unused-vars
const logger = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export const getMockStore = (
  articleInitialState,
  userInitialState,
  chatInitialState,
  commentInitialState,
) => {
  const mockArticleReducer = getMockArticleReducer(articleInitialState);
  const mockUserReducer = getMockUserReducer(userInitialState);
  const mockChatReducer = getMockChatReducer(chatInitialState);
  const mockCommentReducer = getMockCommentReducer(commentInitialState);
  const rootReducer = combineReducers({
    article: mockArticleReducer,
    user: mockUserReducer,
    chat: mockChatReducer,
    comment: mockCommentReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history))),
  );
  return mockStore;
};
