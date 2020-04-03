import * as React from 'react';
import { shallow } from 'enzyme';
import DesktopMenylinje from './DesktopMenylinje';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import HovedmenyDesktop from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { SokDropdown } from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';

const shallowWithProps = () => {
    return shallow(<DesktopMenylinje />);
};

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
