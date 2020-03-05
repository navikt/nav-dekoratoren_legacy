import React from 'react';
import { mount } from 'enzyme';
import { MinsideMenyDesktop } from './MinsideMenyDesktop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '../../../../../reducer/reducer';
import { settArbeidsgiverflate, settPersonflate, settSamarbeidspartnerflate } from '../../../../../reducer/arbeidsflate-duck';
import { ActionType } from '../../../../../redux/actions';
import { Status } from '../../../../../api/api';
import mockMenu from '../../../../../server/mock/menu.json';

const store = createStore(reducer);
store.dispatch({
    type: ActionType.HENT_MENY_OK,
    status: Status.OK,
    data: mockMenu
});

const innloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: true,
        name: 'Ola Nordmann',
        securityLevel: '4',
    }
};

const uInnloggetAction = {
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    data: {
        authenticated: false,
        name: '',
        securityLevel: '',
    },
    status: Status.IKKE_STARTET,
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
