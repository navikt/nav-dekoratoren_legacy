import * as React from 'react';
import { shallow } from 'enzyme';
import DesktopMenylinje from './DesktopMenylinje';
import { Language } from '../../../reducer/language-duck';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import HovedmenyDesktop from './ekspanderende-menyer/hovedmeny-desktop/HovedmenyDesktop';
import { SokDropdown } from './ekspanderende-menyer/sok-dropdown-desktop/SokDropdown';

const shallowWithProps = (language: Language) => {
    return shallow(<DesktopMenylinje language={language} />);
};

describe('<DesktopMenylinje>', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(NavLogoRod)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er norsk', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(HovedmenyDesktop)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyDesktop> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps(Language.ENGELSK);
        expect(wrapper.find(HovedmenyDesktop)).toHaveLength(1);
    });

    it('Skal IKKE rendre <HovedmenyDesktop> komponent hvis språk er samisk', () => {
        const wrapper = shallowWithProps(Language.SAMISK);
        expect(wrapper.find(HovedmenyDesktop)).toHaveLength(0);
    });

    it('Skal rendre <SokDropdown> komponent', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(SokDropdown)).toHaveLength(1);
    });
});
