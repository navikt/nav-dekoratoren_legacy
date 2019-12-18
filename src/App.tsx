import React from 'react';
import 'whatwg-fetch';
import getStore from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { verifyWindowObj } from './Environment';
import setupMock from './mocks/setup-mock';
import LanguageProvider from './provider/Language-provider';
import Header from './komponenter/header/Header';
import Footer from './komponenter/footer/Footer';
import Environment from './Environment';

const store = getStore();

if (
    process.env.NODE_ENV === 'development' ||
    window.location.origin.toLowerCase().includes('localhost')
) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');

    Environment.settEnv({
        baseUrl: 'http://localhost:3000',
        baseUrlEnonic: 'https://www-x1.nav.no',
        innloggingslinjenUrl: 'http://localhost:3000/innloggingslinje-api/auth',
        menypunkter: `http://localhost:8088/person/nav-dekoratoren/api/get/menyvalg`,
        minsideArbeidsgiverUrl: `https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/`,
        sokeresultat: `http://localhost:8088/person/nav-dekoratoren/api/get/sokeresultat`,
        varselinnboksUrl: `http://localhost:8088/person/varselinnboks`,
        loginUrl: '#',
        logoutUrl: '#',
    });

    if (verifyWindowObj()) {
        setupMock();
    }
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
