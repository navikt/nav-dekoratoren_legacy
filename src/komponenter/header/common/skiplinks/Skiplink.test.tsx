import React from 'react';
import { createStore } from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import Skiplink from 'komponenter/header/common/skiplinks/Skiplink';
import { act, render, screen } from '@testing-library/react';
import { finnTekst } from 'tekster/finn-tekst';
import { Locale } from 'store/reducers/language-duck';

const store = createStore();

const renderSkiplinksWithMaincontent = () =>
    act(() => {
        render(
            <ReduxProvider store={store}>
                <div id="maincontent" />
                <Skiplink />
            </ReduxProvider>
        );
    });

describe('<Skiplink>', () => {
    test('Skal rendre skiplink for hovedinnhold når #maincontent element eksisterer', () => {
        renderSkiplinksWithMaincontent();
        expect(screen.queryByText(finnTekst('skiplinks-ga-til-hovedinnhold', Locale.BOKMAL))).toBeTruthy();
    });
});
