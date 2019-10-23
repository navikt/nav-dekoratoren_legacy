import React from 'react';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import setupMock from './mocks/setup-mock';
import { verifyWindowObj } from './utils/environments';
import Footer from './komponenter/footer/Footer';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import 'whatwg-fetch';

const store = getStore();

if (
    process.env.NODE_ENV === 'development' ||
    window.location.origin.toLowerCase().includes('localhost')
) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');

    if (verifyWindowObj()) {
        setupMock();
    }
}

function App() {
    return (
        <ReduxProvider store={store}>
            <LanguageProvider>
                <>
                    <Header />
                    <Footer />
                </>
            </LanguageProvider>
        </ReduxProvider>
    );
}
export default App;
