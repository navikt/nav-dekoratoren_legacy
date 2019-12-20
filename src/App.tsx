import React from 'react';
import 'whatwg-fetch';
import getStore from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { erDev, localEnv, verifyWindowObj } from './utils/Environment';
import setupMock from './mocks/setup-mock';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import Footer from './komponenter/footer/Footer';
import Environment from './utils/Environment';

const store = getStore();

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
    Environment.settEnv(localEnv);
    // setupMock();
}

function App() {
    return (
        <ReduxProvider store={store}>
            <LanguageProvider>
                <Header />
                <Footer />
            </LanguageProvider>
        </ReduxProvider>
    );
}
export default App;
