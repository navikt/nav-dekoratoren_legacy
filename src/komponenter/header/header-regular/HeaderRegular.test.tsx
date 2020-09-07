import React from 'react';
import { mount } from 'enzyme';
import { Locale, languageDuck } from 'store/reducers/language-duck';
import Arbeidsflatemeny from './desktop/arbeidsflatemeny/Arbeidsflatemeny';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from 'store/reducers';
import { HeaderRegular } from './HeaderRegular';

const mountWithRedux = (store: Store) =>
    mount(
        <Provider store={store}>
            <HeaderRegular />
        </Provider>
    );

const store = createStore(reducers);

describe('<RegularHeader>', () => {
    it('Skal rendre <Arbeidsflatemeny> komponent hvis språk er norsk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Locale.BOKMAL })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(1);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er engelsk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Locale.ENGELSK })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(0);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er samisk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Locale.SAMISK })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(0);
    });
});
