import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from './redux/store';
import Header from './komponenter/header/Header';
import Footer from './komponenter/footer/Footer';
import Skiplinks from './komponenter/header/Skiplinks';
import setupMock from './mocks/setup-mock';
import InnloggingsstatusProvider from './provider/innloggingsstatus-provider';

const store = getStore();

if (process.env.REACT_APP_MOCK) {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');

    setupMock();
}

function App() {
    return (
        <ReduxProvider store={store}>
            <InnloggingsstatusProvider>
                <>
                    <Header />
                    <Skiplinks />
                    <Footer />
                </>
            </InnloggingsstatusProvider>
        </ReduxProvider>
    );
}
export default App;
