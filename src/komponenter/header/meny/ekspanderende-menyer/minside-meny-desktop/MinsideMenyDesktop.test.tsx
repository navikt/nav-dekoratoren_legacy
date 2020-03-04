import React from 'react';
import { mount } from 'enzyme';
import { MinsideMenyDesktop } from './MinsideMenyDesktop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '../../../../../reducer/reducer';
import { settPersonflate } from '../../../../../reducer/arbeidsflate-duck';

const store = createStore(reducer);

const mountWithRedux = () => {
    return mount(
        <Provider store={store}>
            <MinsideMenyDesktop />
        </Provider>
    );
};

// TODO: lage nye passende tester for denne komponenten
describe('<MinsideMenyDesktop>', () => {
    it('Skal ikke vise minsidelenke når bruker er PRIVATPERSON og uinnlogget', () => {
        store.dispatch(settPersonflate());
        const wrapper = mountWithRedux();
        expect(wrapper.find('#desktop-minside-meny__knapp')).toHaveLength(0);
    });

    // it('Skal vise minsidelenke når bruker er PRIVATPERSON og innlogget', () => {
    //     store.dispatch(settPersonflate());
    //     store.dispatch();
    //     const wrapper = mountWithRedux();
    //     expect(wrapper.find('#desktop-minside-meny__knapp')).toHaveLength(1);
    // });
    //
    // it('Skal ikke vise minsidelenke når bruker er SAMARBEIDSPARTNER og innlogget', () => {
    //     const wrapper = mountWithRedux(true, MenuValue.SAMARBEIDSPARTNER);
    //     expect(wrapper.find('.lenke')).toHaveLength(0);
    // });

    // it('Skal vise riktig tabindex', () => {
    //     const wrapper = mountWithRedux(true, MenuValue.ARBEIDSGIVER);
    //     expect(wrapper.find('a[tabindex="0"]')).toBeTruthy();
    // });
});
