import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { hentInnloggingsstatusOk } from 'store/reducers/innloggingsstatus-duck';
import { createStore } from 'store';
import LoggInnKnapp from './LoggInnKnapp';
import { finnTekst } from '../../../../../tekster/finn-tekst';
import { Locale } from '../../../../../store/reducers/language-duck';

describe('<LoggInnKnapp />', () => {
    const store = createStore();
    render(
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );

    // Logged out
    it('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        expect(screen.findByText(finnTekst('logg-inn-knapp', Locale.BOKMAL)));
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

        expect(screen.findByText(finnTekst('logg-ut-knapp', Locale.BOKMAL)));
    });
});
