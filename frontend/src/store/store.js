import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import articleReducer from './reducers/Article';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  article: articleReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const middelwares = [thunk, routerMiddleware(history)];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middelwares)),
);

export default store;
