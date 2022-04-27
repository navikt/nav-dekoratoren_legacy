import React from 'react';
import { createStore } from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import Skiplinks from 'komponenter/header/common/skiplinks/Skiplinks';
import { act, render, screen } from '@testing-library/react';
import { finnTekst } from '../../../../tekster/finn-tekst';
import { Locale } from '../../../../store/reducers/language-duck';

const store = createStore();

const renderSkiplinks = () =>
    render(
        <ReduxProvider store={store}>
            <Skiplinks />
        </ReduxProvider>
    );

const renderSkiplinksWithMaincontent = () =>
    act(() => {
        render(
            <ReduxProvider store={store}>
                <div id="maincontent" />
                <Skiplinks />
            </ReduxProvider>
        );
    });

describe('<Skiplinks>', () => {
    test('Skal rendre 2 skiplinks for mobil', () => {
        renderSkiplinks();
        expect(screen.getAllByTestId('skiplink__mobil')).toHaveLength(2);
    });

    test('Skal rendre 2 skiplinks for desktop', () => {
        renderSkiplinks();
        expect(screen.getAllByTestId('skiplink__desktop')).toHaveLength(2);
    });

    test('Skal rendre skiplink for hovedinnhold når #maincontent element eksisterer', () => {
        renderSkiplinksWithMaincontent();

        screen.findByText(finnTekst('skiplinks-ga-til-hovedinnhold', Locale.BOKMAL));
    });
});
