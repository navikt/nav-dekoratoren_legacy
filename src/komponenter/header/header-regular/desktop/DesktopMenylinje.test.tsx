import * as React from 'react';
import DesktopMenylinje from './DesktopMenylinje';
import NavLogoHeader from 'komponenter/header/header-regular/common/logo/NavLogoHeader';
import HovedmenyDesktop from './hovedmeny/HovedmenyDesktop';
import { SokDropdown } from './sok/SokDropdown';
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
        expect(wrapper.find(NavLogoHeader)).toHaveLength(1);
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
