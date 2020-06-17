import * as React from 'react';
import HovedmenyDesktopInnhold from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktopInnhold';
import { SokDropdown } from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from 'store/reducers';
import { mount } from 'enzyme';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';

const store = createStore(reducers);

const shallowWithProps = () =>
    mount(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );

describe('<DesktopMenylinje>', () => {
    it('Skal rendre <NavLogoLenke> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(NavLogoLenke)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er norsk', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(HovedmenyDesktopInnhold)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(HovedmenyDesktopInnhold)).toHaveLength(1);
    });

    it('Skal rendre <SokDropdown> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(SokDropdown)).toHaveLength(1);
    });
});
