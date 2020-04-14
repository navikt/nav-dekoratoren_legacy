import * as React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import { hentInnloggingsstatusOk } from 'reducer/innloggingsstatus-duck';
import Tekst from 'tekster/finn-tekst';
import LoggInnKnapp from './Logg-inn-knapp';
import { createStore } from 'state/store';
import { Store } from 'redux';

const mountWithRedux = (store: Store) =>
    mount(
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );

describe('<LoggInnKnapp />', () => {
    const store = createStore();

    it('Rendrer to <Tekst> komponenter (en for mobil og en for tablet/desktop)', () => {
        expect(mountWithRedux(store).find(Tekst)).toHaveLength(1);
    });

    // Logged out
    it('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        expect(
            mountWithRedux(store)
                .find('.knappetekst')
                .at(0)
                .text()
        ).toEqual('Logg inn');

        expect(
            mountWithRedux(store)
                .find('.login-knapp')
                .at(0)
                .text()
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
            mountWithRedux(store)
                .find('.knappetekst')
                .first()
                .text()
        ).toEqual('Logg ut');
        expect(
            mountWithRedux(store)
                .find('.login-knapp')
                .first()
                .text()
        ).toEqual('Logg ut');
    });
});
