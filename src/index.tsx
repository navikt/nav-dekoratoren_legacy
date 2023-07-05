// Import designsystem styling early, to ensure our own CSS gets higher specificity
/* Defaults */
import '@navikt/ds-css/dist/global/fonts.css';
import '@navikt/ds-css/dist/global/tokens.css';
import '@navikt/ds-css/dist/global/reset.css';
import '@navikt/ds-css/dist/global/baseline.css';
import '@navikt/ds-css/dist/global/print.css';

/* Components */
import '@navikt/ds-css/dist/component/typography.css';
import '@navikt/ds-css/dist/component/form.css';
import '@navikt/ds-css/dist/component/alert.css';
import '@navikt/ds-css/dist/component/button.css';
import '@navikt/ds-css/dist/component/linkpanel.css';
import '@navikt/ds-css/dist/component/link.css';
import '@navikt/ds-css/dist/component/loader.css';
import '@navikt/ds-css/dist/component/modal.css';
import '@navikt/ds-css/dist/component/panel.css';
import '@navikt/ds-css/dist/component/readmore.css';
import '@navikt/ds-css/dist/component/tag.css';

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
import { hotjarMaskHtml } from './utils/analytics/hotjar';

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
            initAnalytics(environment.PARAMS.ANALYTICS_USER_CONFIG);
            injectHeadTags(environment.APP_URL);

            if (environment.PARAMS.MASK_HOTJAR) {
                hotjarMaskHtml();
            }

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
