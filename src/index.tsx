import 'react-app-polyfill/stable';

// Import this early, to ensure our own CSS gets higher specificity
import '@navikt/ds-css/dist/index.css';

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
import { injectHeadTags } from './head';

import './index.scss';

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
        // Hydrate the container if it contains server-side rendered elements
        hydrateRoot(container, reactElement);
    } else {
        // If not, render client-side
        const root = createRoot(container);
        root.render(reactElement);
    }
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
    static getDerivedStateFromError() {}

    componentDidCatch(error: any, errorInfo: any) {
        console.error(`Uventet feil fra dekoratøren: ${error}`, errorInfo);
    }

    render() {
        return this.props.children;
    }
}

const run = () => {
    fetchEnv()
        .then((environment) => {
            initAnalytics();
            injectHeadTags(environment.APP_URL);

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
                <ErrorBoundary>
                    <ReduxProvider store={store}>
                        <CookiesProvider>
                            <Footer />
                        </CookiesProvider>
                    </ReduxProvider>
                </ErrorBoundary>,
                footerContainer
            );

            renderOrHydrate(
                <ErrorBoundary>
                    <ReduxProvider store={store}>
                        <CookiesProvider>
                            <Header />
                        </CookiesProvider>
                    </ReduxProvider>
                </ErrorBoundary>,
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
