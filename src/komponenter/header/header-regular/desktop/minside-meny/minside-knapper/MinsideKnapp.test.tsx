import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { reducers } from 'store/reducers';
import { settArbeidsgiverflate } from 'store/reducers/arbeidsflate-duck';
import { settPersonflate } from 'store/reducers/arbeidsflate-duck';
import { settSamarbeidspartnerflate } from 'store/reducers/arbeidsflate-duck';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import mockMenu from 'server/mock/menu.json';
import { languageDuck } from 'store/reducers/language-duck';
import { Locale } from 'store/reducers/language-duck';
import { MinsidePersonKnapp } from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsidePersonKnapp';
import MinsideArbgiverKnapp from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsideArbgiverKnapp';
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

const mountWithRedux = (store: Store) => {
    return mount(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );
};

describe('Minside knapper', () => {
    const store = createStore(reducers);
    store.dispatch(languageAction);
    store.dispatch(menuAction);
    store.dispatch(innloggetAction);

    it('Skal vise <MinsidePersonKnapp/> knapp når bruker er PRIVATPERSON', () => {
        store.dispatch(settPersonflate());
        const wrapper = mountWithRedux(store);
        expect(wrapper.find(MinsidePersonKnapp)).toHaveLength(1);
    });

    it('Skal vise <MinsideArbgiverKnapp/> knapp når bruker er ARBEIDSGIVER', () => {
        store.dispatch(settArbeidsgiverflate());
        const wrapper = mountWithRedux(store);
        expect(wrapper.find(MinsideArbgiverKnapp)).toHaveLength(1);
    });

    it('Skal ikke vise minside knapp når bruker er SAMARBEIDSPARTNER', () => {
        store.dispatch(settSamarbeidspartnerflate());
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });
});
