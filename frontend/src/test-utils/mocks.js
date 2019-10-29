import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { history } from '../store/store';

const getMockArticleReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);
const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);
const logger = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};
// eslint-disable-next-line import/prefer-default-export
export const getMockStore = (
  articleInitialState,
  userInitialState,
) => {
  const mockArticleReducer = getMockArticleReducer(articleInitialState);
  const mockUserReducer = getMockUserReducer(userInitialState);
  const rootReducer = combineReducers({
    article: mockArticleReducer,
    user: mockUserReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history))),
  );
  return mockStore;
};
