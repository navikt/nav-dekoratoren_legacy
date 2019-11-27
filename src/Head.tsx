import React from 'react';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import setupMock from './mocks/setup-mock';
import { verifyWindowObj } from './utils/environments';

const echoDevMode = () => {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
};

if (process.env.NODE_ENV === 'development') {
    if (verifyWindowObj()) {
        echoDevMode();
        setupMock();
    }
}

if (verifyWindowObj()) {
    if (window.location.origin.toLowerCase().includes('localhost')) {
        echoDevMode();
        setupMock();
    }
}

function Head() {
    return (
        <LanguageProvider>
            <Header />
        </LanguageProvider>
    );
}
export default Head;
