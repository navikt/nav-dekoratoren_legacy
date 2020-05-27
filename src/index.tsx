import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Nødvendig for IE11-støtte i visse apper.
// Ikke oppgrader fra v.3.5.0 før denne er fikset:
// https://github.com/zloirock/core-js/issues/741
import 'core-js/stable/regexp';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from './store';
import { erDev, verifyWindowObj } from './utils/Environment';
import { fetchEnv } from './utils/Environment';
import { initGA } from './utils/google-analytics';
import { initAmplitude } from './utils/amplitude';
import Footer from './komponenter/footer/Footer';
import Header from './komponenter/header/Header';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'universal-cookie';
import './index.less';

const loadedStates = ['complete', 'loaded', 'interactive'];

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

const run = () => {
    initGA();
    initAmplitude();
    fetchEnv()
        .then((environment) => {
            const cookies = new Cookies();
            const store = createStore(environment, cookies);
            ReactDOM.render(
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Header />
                    </CookiesProvider>
                </ReduxProvider>,
                document.getElementById('decorator-header')
            );
            ReactDOM.render(
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Footer />
                    </CookiesProvider>
                </ReduxProvider>,
                document.getElementById('decorator-footer')
            );
        })
        .catch((e) => {
            console.error(e);
        });
};

if (verifyWindowObj()) {
    loadedStates.includes(document.readyState) && document.body
        ? run()
        : window.addEventListener('DOMContentLoaded', run, false);
} else {
    run();
}
