import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'store';
import { dataInitState } from 'store/reducers/menu-duck';
import { Locale } from 'store/reducers/language-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { HovedmenyInnhold } from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyInnhold';
import { kbNavDummy } from 'utils/jest/testObjects';

const store = createStore();

const renderWithProps = (lang: Locale, arbeidsflate: MenuValue) =>
    render(
        <ReduxProvider store={store}>
            <HovedmenyInnhold
                arbeidsflate={arbeidsflate}
                menyPunkter={dataInitState}
                language={lang}
                isOpen={true}
                kbNavMainState={kbNavDummy}
            />
        </ReduxProvider>
    );

describe('<HovedmenyDropdown />', () => {
    test('Rendrer <Toppseksjon> komponent', () => {
        renderWithProps(Locale.BOKMAL, MenuValue.PRIVATPERSON);
        expect(screen.queryByTestId('toppseksjon')).toBeTruthy();
    });

    test('Rendrer <Hovedseksjon> komponent', () => {
        renderWithProps(Locale.BOKMAL, MenuValue.PRIVATPERSON);
        expect(screen.queryByTestId('hovedseksjon')).toBeTruthy();
    });

    test('Rendrer <Bunnseksjon> komponent', () => {
        renderWithProps(Locale.BOKMAL, MenuValue.PRIVATPERSON);
        expect(screen.queryByTestId('bunnseksjon')).toBeTruthy();
    });
});
