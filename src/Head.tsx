import React from 'react';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import setupMock from './mocks/setup-mock';
import { verifyWindowObj } from './utils/environments';

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

function Head() {
    return (
        <LanguageProvider>
            <>
                <Header />
            </>
        </LanguageProvider>
    );
}
export default Head;
