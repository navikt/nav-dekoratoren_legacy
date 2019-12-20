import React from 'react';
import Environment, { erDev, localEnv } from './utils/Environment';
import { verifyWindowObj } from './utils/Environment';
import LanguageProvider from './provider/Language-provider';
import setupMock from './mocks/setup-mock';
import * as es6promise from 'es6-promise';
import Header from './komponenter/header/Header';

if (verifyWindowObj()) {
    es6promise.polyfill();
}

if (erDev) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');
    Environment.settEnv(localEnv);
    setupMock();
}

function Head() {
    return (
        <LanguageProvider>
            <Header />
        </LanguageProvider>
    );
}
export default Head;
