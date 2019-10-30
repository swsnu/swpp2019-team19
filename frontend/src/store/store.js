import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import articleReducer from './reducers/Article';
import userReducer from './reducers/User';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  article: articleReducer,
  user: userReducer,
  router: connectRouter(history),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const middelwares = [thunk, routerMiddleware(history)];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middelwares)),
);

export default store;
