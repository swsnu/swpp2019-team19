import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-named-as-default
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, { history } from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;
axios.get('/api/token/');
ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
