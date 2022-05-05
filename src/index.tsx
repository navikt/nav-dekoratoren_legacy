import 'react-app-polyfill/stable';

import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
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

const renderOrHydrate = (reactElement: JSX.Element, container: Element | null) => {
    if (!container) {
        console.error('Missing container for header/footer!');
    } else if (container.hasChildNodes()) {
        // If the container contains server-side rendered nodes, hydrate
        hydrateRoot(container, reactElement);
    } else {
        // Else render client-side
        const footerRoot = createRoot(container);
        footerRoot.render(reactElement);
    }
};

const run = () => {
    fetchEnv()
        .then((environment) => {
            initAnalytics(environment.PARAMS);
            const store = createStore(environment);

            const headerContainer =
                document.getElementById('decorator-header') ||
                getSalesforceContainer('c-salesforce-header', 'decorator-header');
            const footerContainer =
                document.getElementById('decorator-footer') ||
                getSalesforceContainer('c-salesforce-footer', 'decorator-footer');

            // We hydrate the footer first to prevent client/server mismatch due to client-side only
            // store mutations that occur in the header
            renderOrHydrate(
                <ReduxProvider store={store}>
                    <CookiesProvider>
                        <Footer />
                    </CookiesProvider>
                </ReduxProvider>,
                footerContainer
            );

            renderOrHydrate(
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
