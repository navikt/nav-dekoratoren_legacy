import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { reducers } from 'store/reducers';
import { settArbeidsgiverflate, settPersonflate, settSamarbeidspartnerflate } from 'store/reducers/arbeidsflate-duck';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import mockMenu from 'server/mock/menu.json';
import { languageDuck, Locale } from 'store/reducers/language-duck';
import { innloggetAction } from 'utils/jest/testObjects';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';

const menuAction = {
    type: ActionType.HENT_MENY_OK,
    status: Status.OK,
    data: mockMenu,
};

const languageAction = languageDuck.actionCreator({
    language: Locale.BOKMAL,
});

const store = createStore(reducers);
store.dispatch(languageAction);
store.dispatch(menuAction);
store.dispatch(innloggetAction);

const renderHeaderMenylinje = (store: Store) =>
    render(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );

describe('Minside knapp', () => {
    test('Skal vise <MinsidePersonKnapp/> knapp når bruker er PRIVATPERSON', () => {
        act(() => {
            store.dispatch(settPersonflate());
        });

        renderHeaderMenylinje(store);
        expect(screen.queryByTestId('minside-person')).toBeTruthy();
    });

    test('Skal vise lenker for min side arbeidsgiver når bruker er ARBEIDSGIVER', () => {
        act(() => {
            store.dispatch(settArbeidsgiverflate());
        });

        renderHeaderMenylinje(store);
        expect(screen.queryByTestId('minside-arbeidsgiver')).toBeTruthy();
    });

    test('Skal ikke min side lenker når bruker er SAMARBEIDSPARTNER', () => {
        act(() => {
            store.dispatch(settSamarbeidspartnerflate());
        });

        renderHeaderMenylinje(store);
        expect(screen.queryByTestId('minside-person')).toBeNull();
        expect(screen.queryByTestId('minside-arbeidsgiver')).toBeNull();
    });
});
