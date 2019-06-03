import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.less';

ReactDOM.render(<App />, document.getElementById('decorator-content'));

serviceWorker.unregister();
