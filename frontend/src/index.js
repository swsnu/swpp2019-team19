import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store, { history } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
