import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import Environment from './Environment';

Environment.settEnv({
    baseUrl: 'http://localhost:3000',
    baseUrlEnonic: 'https://www-x1.nav.no',
    innloggingslinjenUrl: 'http://localhost:3000',
    menypunkter: `http://localhost:8088/person/nav-dekoratoren/api/get/menyvalg`,
    minsideArbeidsgiverUrl: `https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/`,
    sokeresultat: `http://localhost:8088/person/nav-dekoratoren/api/get/sokeresultat`,
    loginUrl: '#',
    logoutUrl: '#',
});

ReactDOM.render(<App />, document.getElementById('decorator'));

/* export function windowSupportObjectAssignNeeded() {
    return window.Promise && window.fetch && window.Symbol;
}

if (verifyWindowObj()) {
    if (windowSupportObjectAssignNeeded() || !(window as any)._babelPolyfill) {
        require('@babel/polyfill');
        require('react-app-polyfill/ie11');
        require('react-app-polyfill/stable');
    }
} */

// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
