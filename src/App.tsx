import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import Header from './komponenter/header/Header';
import Footer from './komponenter/footer/Footer';
import setupMock from './mocks/setup-mock';
import { verifyWindowObj } from './utils/environments';

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
            <Header />
            <Footer />
        </ReduxProvider>
    );
}
export default App;
