import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Language } from '../../reducer/language-duck';
import { Header } from './Header';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';

configure({ adapter: new Adapter() });

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
