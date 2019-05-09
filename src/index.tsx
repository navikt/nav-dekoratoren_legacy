import '@babel/polyfill'
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import './index.less';

ReactDOM.render(<App />, document.getElementById('app-fragments'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

