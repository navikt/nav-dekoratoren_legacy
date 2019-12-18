import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import { verifyWindowObj } from './utils/environments';
import Head from './Head';
import Footer from './komponenter/footer/Footer';
import './index.less';
import { fetchEnv } from './Environment';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer',
};

const store = getStore();
const loadedStates = ['complete', 'loaded', 'interactive'];

const run = () => {
    TagManager.initialize(tagManagerArgs);
    fetchEnv()
        .then(() => {
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
// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
