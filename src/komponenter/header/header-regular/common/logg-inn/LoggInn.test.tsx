import * as React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import { hentInnloggingsstatusOk } from 'store/reducers/innloggingsstatus-duck';
import { createStore } from 'store';
import { Store } from 'redux';
import { LoggInnKnappDesktop } from 'komponenter/header/header-regular/desktop/logg-inn/LoggInnKnappDesktop';
import { LoggInnKnappMobil } from 'komponenter/header/header-regular/mobil/logg-inn/LoggInnKnappMobil';

describe('<LoggInn />', () => {
    const store = createStore();
    const mountWithReduxDesktop = (store: Store) =>
        mount(
            <ReduxProvider store={store}>
                <LoggInnKnappDesktop />
            </ReduxProvider>
        );
    const mountWithReduxMobil = (store: Store) =>
        mount(
            <ReduxProvider store={store}>
                <LoggInnKnappMobil />
            </ReduxProvider>
        );

    // Logged out
    it('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        expect(
            mountWithReduxMobil(store).find('.knappetekst').at(0).text()
        ).toEqual('Logg inn');

        expect(
            mountWithReduxDesktop(store).find('.login-knapp').at(0).text()
        ).toEqual('Logg inn');
    });

    it('Teksten på knappen er LOGG UT når bruker er innlogget', () => {
        // Logged in
        store.dispatch(
            hentInnloggingsstatusOk({
                authenticated: true,
                securityLevel: 'Level4',
                name: 'Test',
            })
        );

        expect(
            mountWithReduxMobil(store).find('.knappetekst').first().text()
        ).toEqual('Logg ut');
        expect(
            mountWithReduxDesktop(store).find('.login-knapp').first().text()
        ).toEqual('Logg ut');
    });
});
