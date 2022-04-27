import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { hentInnloggingsstatusOk } from 'store/reducers/innloggingsstatus-duck';
import { createStore } from 'store';
import LoggInnKnapp from './LoggInnKnapp';
import { finnTekst } from '../../../../../tekster/finn-tekst';
import { Locale } from '../../../../../store/reducers/language-duck';

const store = createStore();

const renderLoggInnKnapp = () =>
    render(
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );

describe('<LoggInnKnapp />', () => {
    renderLoggInnKnapp();

    // Logged out
    test('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        expect(screen.findByText(finnTekst('logg-inn-knapp', Locale.BOKMAL)));
    });

    // Logged in
    test('Teksten på knappen er LOGG UT når bruker er innlogget', () => {
        act(() =>
            store.dispatch(
                hentInnloggingsstatusOk({
                    authenticated: true,
                    securityLevel: 'Level4',
                    name: 'Test',
                })
            )
        );

        expect(screen.findByText(finnTekst('logg-ut-knapp', Locale.BOKMAL)));
    });
});
