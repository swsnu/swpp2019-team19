import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
/* eslint-disable import/no-named-as-default */
import App from './App';
import * as serviceWorker from './serviceWorker';

// CSRF settings
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
