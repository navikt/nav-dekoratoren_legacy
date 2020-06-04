import * as React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import { hentInnloggingsstatusOk } from 'store/reducers/innloggingsstatus-duck';
import { createStore } from 'store';
import { Store } from 'redux';
import LoggInnKnapp from './LoggInnKnapp';

describe('<LoggInnKnapp />', () => {
    const store = createStore();
    const mountWithRedux = (store: Store) =>
        mount(
            <ReduxProvider store={store}>
                <LoggInnKnapp />
            </ReduxProvider>
        );

    // Logged out
    it('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        expect(mountWithRedux(store).find('.login-knapp').at(0).text()).toEqual(
            'Logg inn'
        );
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
            mountWithRedux(store).find('.login-knapp').first().text()
        ).toEqual('Logg ut');
    });
});
