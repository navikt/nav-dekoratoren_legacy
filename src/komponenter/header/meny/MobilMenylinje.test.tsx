import * as React from 'react';
import { shallow } from 'enzyme';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Ekspanderbarmeny from './ekspanderbar-meny/MobilEkspanderbarmeny';
import MobilMenylinje from './MobilMenylinje';
import SokModalToggleknapp from './sok/sok-innhold/SokModalToggleknapp';

const shallowWithProps = () => {
    return shallow(<MobilMenylinje />);
};

describe('<Mobilmeny>', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(NavLogoRod)).toHaveLength(1);
    });

    it('Skal rendre <Ekspanderbarmeny> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(Ekspanderbarmeny)).toHaveLength(1);
    });

    it('Skal rendre <SokModalToggleknapp> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(SokModalToggleknapp)).toHaveLength(1);
    });
});
