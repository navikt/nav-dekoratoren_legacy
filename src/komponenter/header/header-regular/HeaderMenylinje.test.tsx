import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from 'store/reducers';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import { settArbeidsflate } from 'store/reducers/arbeidsflate-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { innloggetAction, uInnloggetAction } from 'utils/jest/testObjects';
import { finnTekst } from '../../../tekster/finn-tekst';
import { Locale } from '../../../store/reducers/language-duck';

const store = createStore(reducers);

const renderHeaderMenylinje = () =>
    render(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );

describe('<HeaderMenylinje>', () => {
    test('Skal rendre <NavLogoLenke> komponent', () => {
        renderHeaderMenylinje();
        expect(screen.queryByAltText('Til forsiden')).toBeTruthy();
    });

    test('Skal rendre <HovedmenyKnapp> for mobil og desktop', () => {
        renderHeaderMenylinje();
        expect(screen.queryAllByText(finnTekst('meny-knapp', Locale.BOKMAL))).toHaveLength(2);
    });

    test('Skal rendre <SokDropdown> komponent', () => {
        renderHeaderMenylinje();
        expect(screen.queryByTestId('sok-dropdown')).toBeTruthy();
    });

    test('Skal rendre <LoggInnKnapp/> komponent med logg inn tekst', () => {
        renderHeaderMenylinje();
        act(() => {
            store.dispatch({
                type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
                status: Status.OK,
                data: {
                    authenticated: false,
                },
            });
        });

        expect(screen.queryByText(finnTekst('logg-inn-knapp', Locale.BOKMAL))).toBeTruthy();
    });

    test('Skal rendre <Varsler />, <Minsidemeny /> og <LoggInnKnapp/> (med logg ut tekst) komponent for innlogget personbruker', () => {
        renderHeaderMenylinje();
        act(() => {
            store.dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
            store.dispatch(innloggetAction);
        });

        expect(screen.queryByText(finnTekst('logg-ut-knapp', Locale.BOKMAL))).toBeTruthy();
        expect(screen.queryAllByText(finnTekst('varsler-tittel', Locale.BOKMAL))).toHaveLength(1);
        expect(screen.queryByTestId('minside-meny')).toBeTruthy();
    });

    test('Skal ikke rendre <VarslerKnapp /> og <Minsidemeny /> komponent for uinnlogget personbruker', () => {
        renderHeaderMenylinje();
        act(() => {
            store.dispatch(settArbeidsflate(MenuValue.PRIVATPERSON));
            store.dispatch(uInnloggetAction);
        });

        expect(screen.queryByText(finnTekst('varsler-tittel', Locale.BOKMAL))).toBeNull();
        expect(screen.queryByTestId('minside-meny')).toBeNull();
    });
});
