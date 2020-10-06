import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { reducers } from 'store/reducers';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import mockMenu from 'server/mock/menu.json';
import { languageDuck, Locale } from 'store/reducers/language-duck';
import { MinsidePersonKnapp } from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsidePersonKnapp';
import MinsideArbgiverKnapp from 'komponenter/header/header-regular/desktop/minside-meny/minside-knapper/MinsideArbgiverKnapp';
import { innloggetAction } from 'utils/jest/testObjects';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';
import { setParams } from 'store/reducers/environment-duck';
import { MenuValue } from 'utils/meny-storage-utils';

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
        store.dispatch(setParams({ CONTEXT: MenuValue.PRIVATPERSON }));
        const wrapper = mountWithRedux(store);
        expect(wrapper.find(MinsidePersonKnapp)).toHaveLength(1);
    });

    it('Skal vise <MinsideArbgiverKnapp/> knapp når bruker er ARBEIDSGIVER', () => {
        store.dispatch(setParams({ CONTEXT: MenuValue.ARBEIDSGIVER }));
        const wrapper = mountWithRedux(store);
        expect(wrapper.find(MinsideArbgiverKnapp)).toHaveLength(1);
    });

    it('Skal ikke vise minside knapp når bruker er SAMARBEIDSPARTNER', () => {
        store.dispatch(setParams({ CONTEXT: MenuValue.SAMARBEIDSPARTNER }));
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });
});
