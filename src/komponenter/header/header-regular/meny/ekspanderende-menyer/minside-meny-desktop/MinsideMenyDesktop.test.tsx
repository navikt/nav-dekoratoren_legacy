import React from 'react';
import { mount } from 'enzyme';
import { MinsideMenyDesktop } from './MinsideMenyDesktop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from 'store/reducers';
import { settArbeidsgiverflate } from 'store/reducers/arbeidsflate-duck';
import { settPersonflate } from 'store/reducers/arbeidsflate-duck';
import { settSamarbeidspartnerflate } from 'store/reducers/arbeidsflate-duck';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import mockMenu from 'server/mock/menu.json';

const store = createStore(reducers);

store.dispatch({
    type: ActionType.HENT_MENY_OK,
    status: Status.OK,
    data: mockMenu,
});

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

const mountWithRedux = () => {
    return mount(
        <Provider store={store}>
            <MinsideMenyDesktop />
        </Provider>
    );
};

describe('<MinsideMenyDesktop>', () => {
    it('Skal ikke vise minside knapp når bruker er PRIVATPERSON og uinnlogget', () => {
        store.dispatch(settPersonflate());
        store.dispatch(uInnloggetAction);
        const wrapper = mountWithRedux();
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });

    it('Skal vise minside knapp når bruker er PRIVATPERSON og innlogget', () => {
        store.dispatch(settPersonflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux();
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(1);
    });

    it('Skal ikke vise minside knapp når bruker er SAMARBEIDSPARTNER og innlogget', () => {
        store.dispatch(settSamarbeidspartnerflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux();
        expect(wrapper.find('.desktop-minside-meny__knapp')).toHaveLength(0);
    });

    it('Skal vise riktig tabindex', () => {
        store.dispatch(settArbeidsgiverflate());
        store.dispatch(innloggetAction);
        const wrapper = mountWithRedux();
        expect(wrapper.find('a[tabindex="0"]')).toBeTruthy();
    });
});
