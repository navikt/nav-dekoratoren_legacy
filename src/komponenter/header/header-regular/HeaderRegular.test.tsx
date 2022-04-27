import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Locale, languageDuck } from 'store/reducers/language-duck';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from 'store/reducers';
import { HeaderRegular } from './HeaderRegular';

const renderHeaderRegular = (store: Store) =>
    render(
        <Provider store={store}>
            <HeaderRegular />
        </Provider>
    );

const store = createStore(reducers);

describe('<RegularHeader>', () => {
    test('Skal rendre <Arbeidsflatemeny> komponent hvis språk er norsk', () => {
        act(() => {
            store.dispatch(languageDuck.actionCreator({ language: Locale.BOKMAL }));
        });

        renderHeaderRegular(store);
        expect(screen.queryByTestId('arbeidsflatemeny')).toBeTruthy();
    });

    test('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er engelsk', () => {
        act(() => {
            store.dispatch(languageDuck.actionCreator({ language: Locale.ENGELSK }));
        });

        renderHeaderRegular(store);
        expect(screen.queryByTestId('arbeidsflatemeny')).toBeNull();
    });

    test('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er samisk', () => {
        act(() => {
            store.dispatch(languageDuck.actionCreator({ language: Locale.SAMISK }));
        });

        renderHeaderRegular(store);
        expect(screen.queryByTestId('arbeidsflatemeny')).toBeNull();
    });
});
