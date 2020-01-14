import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavLogoRod from '../../../ikoner/meny/NavLogoRod';
import Ekspanderbarmeny from './ekspanderbar-meny/Ekspanderbarmeny';
import Mobilmeny from './Mobilmeny';
import SokModalToggleknapp from './sok/sok-innhold/SokModalToggleknapp';

configure({ adapter: new Adapter() });

const shallowWithProps = () => {
    return shallow(<Mobilmeny />);
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
