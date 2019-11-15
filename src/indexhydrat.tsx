import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import './index.less';
import { verifyWindowObj } from './utils/environments';
import Footer from './komponenter/footer/Footer';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import GoogleTagManager from 'react-google-tag-manager';

import Head from './Head';

<GoogleTagManager gtmId='GTM-12345' />

const store = getStore();
const loadedStates = ['complete', 'loaded', 'interactive'];

const run = () => {
    ReactDOM.hydrate(
        <ReduxProvider store={store}>
            <Head />
        </ReduxProvider>,
        document.getElementById('decorator-header')
    );
    ReactDOM.hydrate(
        <ReduxProvider store={store}>
            <Footer />
        </ReduxProvider>,
        document.getElementById('decorator-footer')
    );
};

if (verifyWindowObj()) {
    loadedStates.includes(document.readyState) && document.body
        ? run()
        : window.addEventListener('DOMContentLoaded', run, false);
} else {
    run();
}

// serviceWorker.unregister();
