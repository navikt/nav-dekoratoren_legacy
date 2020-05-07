import React from 'react';
import { mount } from 'enzyme';
import { MinsideMeny } from './MinsideMeny';
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
import { Language } from 'store/reducers/language-duck';
import { kbMasterNode } from 'utils/keyboard-navigation/useKbNavMain';

const innloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: true,
        name: 'Ola Nordmann',
        securityLevel: '4',
    },
};

const uInnloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: false,
    },
};

const menuAction = {
    type: ActionType.HENT_MENY_OK,
    status: Status.OK,
    data: mockMenu,
};

const languageAction = languageDuck.actionCreator({
    language: Language.NORSK,
});

const kbNavDummy = {
    mainNodeMap: {},
    subNodeMap: {},
    currentNode: kbMasterNode,
    setCurrentNode: () => null,
    setSubGraph: () => null,
};

const mountWithRedux = (store: Store) => {
    return mount(
        <Provider store={store}>
            <MinsideMeny kbNavMainState={kbNavDummy} />
        </Provider>
    );
};

describe('<MinsideMeny>', () => {
    const store = createStore(reducers);
    store.dispatch(languageAction);
    store.dispatch(menuAction);

    it('Skal ikke vise minside knapp når bruker er PRIVATPERSON og uinnlogget', () => {
        store.dispatch(settPersonflate());
        store.dispatch(uInnloggetAction);
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });

    it('Skal vise minside knapp når bruker er PRIVATPERSON og innlogget', () => {
        store.dispatch(settPersonflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(1);
    });

    it('Skal ikke vise minside knapp når bruker er SAMARBEIDSPARTNER og innlogget', () => {
        store.dispatch(settSamarbeidspartnerflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });

    it('Skal vise riktig tabindex', () => {
        store.dispatch(settArbeidsgiverflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux(store);
        expect(wrapper.find('a[tabindex="0"]')).toBeTruthy();
    });
});
