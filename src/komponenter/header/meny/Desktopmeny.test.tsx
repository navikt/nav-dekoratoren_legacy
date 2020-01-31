import * as React from 'react';
import { shallow } from 'enzyme';
import DesktopMeny from './Desktopmeny';
import { Language } from '../../../reducer/language-duck';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Ekspanderbarmeny from './ekspanderbar-meny/Ekspanderbarmeny';
import Sok from './sok/Sok';

const shallowWithProps = (language: Language) => {
    return shallow(<DesktopMeny language={language} />);
};

describe('<DesktopMeny>', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(NavLogoRod)).toHaveLength(1);
    });

    it('Skal rendre <Ekspanderbarmeny> komponent hvis språk er norsk', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(Ekspanderbarmeny)).toHaveLength(1);
    });

    it('Skal rendre <Ekspanderbarmeny> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps(Language.ENGELSK);
        expect(wrapper.find(Ekspanderbarmeny)).toHaveLength(1);
    });

    it('Skal IKKE rendre <Ekspanderbarmeny> komponent hvis språk er samisk', () => {
        const wrapper = shallowWithProps(Language.SAMISK);
        expect(wrapper.find(Ekspanderbarmeny)).toHaveLength(0);
    });

    it('Skal rendre <Sok> komponent', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(Sok)).toHaveLength(1);
    });
});
