import React from 'react';
import { shallow } from 'enzyme';
import { Language } from '../../reducer/language-duck';
import { Header } from './Header';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';

const shallowWithProps = (language: Language) => {
    return shallow(<Header language={language} />);
};

describe('<Header>', () => {
    it('Skal rendre <Arbeidsflatemeny> komponent hvis språk er norsk', () => {
        const wrapper = shallowWithProps(Language.NORSK);
        expect(wrapper.find(Arbeidsflatemeny)).toHaveLength(1);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps(Language.ENGELSK);
        expect(wrapper.find(Arbeidsflatemeny)).toHaveLength(0);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er samisk', () => {
        const wrapper = shallowWithProps(Language.SAMISK);
        expect(wrapper.find(Arbeidsflatemeny)).toHaveLength(0);
    });
});
