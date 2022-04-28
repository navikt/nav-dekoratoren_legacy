import 'react-app-polyfill/stable';

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'store';
import { erDev, verifyWindowObj } from 'utils/Environment';
import { fetchEnv } from 'utils/Environment';
import { initAnalytics } from 'utils/analytics/analytics';
import Footer from './komponenter/footer/Footer';
import Header from './komponenter/header/Header';
import { CookiesProvider } from 'react-cookie';
import { getSalesforceContainer } from './server/utils';
import './index.less';

const loadedStates = ['complete', 'loaded', 'interactive'];

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

const run = () => {
    fetchEnv()
        .then((environment) => {
            initAnalytics(environment.PARAMS);
            const store = createStore(environment);

            const headerContainer =
                document.getElementById('decorator-header') ||
                getSalesforceContainer('salesforce-header', 'decorator-header');
            const footerContainer =
                document.getElementById('decorator-footer') ||
                getSalesforceContainer('salesforce-footer', 'decorator-footer');

            if (!headerContainer) {
                throw new Error('Header container not found!');
            }

            if (!footerContainer) {
                throw new Error('Footer container not found!');
            }

            hydrateRoot(
                footerContainer,
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Footer />
                    </CookiesProvider>
                </ReduxProvider>
            );
            hydrateRoot(
                headerContainer,
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Header />
                    </CookiesProvider>
                </ReduxProvider>
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
