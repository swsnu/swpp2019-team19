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

// eslint-disable-next-line no-unused-vars
const logger = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

// eslint-disable-next-line import/prefer-default-export
// export const getMockStore = (select, initialState) => {
//   let mockReducer;
//   let rootReducer;
//   if (select === 'article') {
//     mockReducer = getMockArticleReducer(initialState);
//     rootReducer = combineReducers({
//       article: mockReducer,
//       router: connectRouter(history),
//     });
//   } else {
//     mockReducer = getMockUserReducer(initialState);
//     rootReducer = combineReducers({
//       user: mockReducer,
//       router: connectRouter(history),
//     });
//   }

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
