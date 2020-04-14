import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from './state/store';
import { erDev, verifyWindowObj } from './utils/Environment';
import Footer from './komponenter/footer/Footer';
import { fetchEnv } from './utils/Environment';
import { initGA } from './utils/google-analytics';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import * as es6promise from 'es6-promise';
import './index.less';

const loadedStates = ['complete', 'loaded', 'interactive'];

if (verifyWindowObj()) {
    es6promise.polyfill();
}

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

const run = () => {
    initGA();
    fetchEnv()
        .then(environment => {
            const store = createStore(environment);
            ReactDOM.hydrate(
                <ReduxProvider store={store}>
                    <LanguageProvider>
                        <Header />
                    </LanguageProvider>
                </ReduxProvider>,
                document.getElementById('decorator-header')
            );
            ReactDOM.hydrate(
                <ReduxProvider store={store}>
                    <Footer />
                </ReduxProvider>,
                document.getElementById('decorator-footer')
            );
        })
        .catch(e => {
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
