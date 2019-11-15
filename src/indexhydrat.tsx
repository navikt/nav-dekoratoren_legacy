import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import TagManager from 'react-gtm-module';
import { verifyWindowObj } from './utils/environments';
import Head from './Head';
import Footer from './komponenter/footer/Footer';
import './index.less';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer'
};

const store = getStore();
const loadedStates = ['complete', 'loaded', 'interactive'];

const run = () => {
    TagManager.initialize(tagManagerArgs);
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
