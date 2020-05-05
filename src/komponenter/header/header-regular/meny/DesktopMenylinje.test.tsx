import * as React from 'react';
import DesktopMenylinje from './DesktopMenylinje';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import HovedmenyDesktop from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { SokDropdown } from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from 'store/reducers';
import { mount } from 'enzyme';

const store = createStore(reducers);

const shallowWithProps = () =>
    mount(
        <Provider store={store}>
            <DesktopMenylinje />
        </Provider>
    );

describe('<DesktopMenylinje>', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(NavLogoRod)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er norsk', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(HovedmenyDesktop)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(HovedmenyDesktop)).toHaveLength(1);
    });

    it('Skal rendre <SokDropdown> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(SokDropdown)).toHaveLength(1);
    });
});
