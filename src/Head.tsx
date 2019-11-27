import React from 'react';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import setupMock from './mocks/setup-mock';
import { verifyWindowObj } from './utils/environments';
import * as es6promise from 'es6-promise';
import 'isomorphic-fetch';

if (verifyWindowObj()) {
    es6promise.polyfill();
}

function echoDevMode() {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
}

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
