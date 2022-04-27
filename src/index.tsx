import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'store';
import { erDev, verifyWindowObj } from 'utils/Environment';
import { fetchEnv } from 'utils/Environment';
import { initAnalytics } from 'utils/analytics/analytics';
import Footer from './komponenter/footer/Footer';
import Header from './komponenter/header/Header';
import { CookiesProvider } from 'react-cookie';
import './index.less';

const loadedStates = ['complete', 'loaded', 'interactive'];

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

const getSalesforceHeaderContainer = () =>
    document.getElementsByTagName('salesforce-header')[0]?.getElementsByClassName('decorator-header')[0];
const getSalesforceFooterContainer = () =>
    document.getElementsByTagName('salesforce-footer')[0]?.getElementsByClassName('decorator-footer')[0];

const run = () => {
    fetchEnv()
        .then((environment) => {
            initAnalytics(environment.PARAMS);
            const store = createStore(environment);

            const headerContainer = document.getElementById('decorator-header') || getSalesforceHeaderContainer();
            const footerContainer = document.getElementById('decorator-footer') || getSalesforceFooterContainer();

            ReactDOM.hydrate(
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Footer />
                    </CookiesProvider>
                </ReduxProvider>,
                footerContainer
            );
            ReactDOM.hydrate(
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Header />
                    </CookiesProvider>
                </ReduxProvider>,
                headerContainer
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
