import * as React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import { MinsideLenke } from './MinsideLenke';

configure({ adapter: new Adapter() });

const mountWithProps = (erInnlogget: boolean, arbeidsflate: MenuValue) => {
    return mount(
        <MinsideLenke
            erinnlogget={erInnlogget}
            arbeidsflate={arbeidsflate}
            tabindex={true}
        />
    );
};

describe('<MinsideLenke>', () => {
    it('Skal rendre minside-container (.minside-lenke)', () => {
        const wrapper = mountWithProps(true, MenuValue.PRIVATPERSON);
        expect(wrapper.find('div.minside-lenke')).toHaveLength(1);
    });

    it('Skal ikke vise minsidelenke når bruker er PRIVATPERSON og uinnlogget', () => {
        const wrapper = mountWithProps(false, MenuValue.PRIVATPERSON);
        expect(wrapper.find('.lenke')).toHaveLength(0);
    });

    it('Skal vise minsidelenke når bruker er PRIVATPERSON og innlogget', () => {
        const wrapper = mountWithProps(true, MenuValue.PRIVATPERSON);
        expect(wrapper.find('.lenke')).toHaveLength(1);
    });

    it('Skal ikke vise minsidelenke når bruker er SAMARBEIDSPARTNER og innlogget', () => {
        const wrapper = mountWithProps(true, MenuValue.SAMARBEIDSPARTNER);
        expect(wrapper.find('.lenke')).toHaveLength(0);
    });

    it('Skal vise riktig tekst på lenke når bruker er PRIVATPERSON', () => {
        const wrapper = mountWithProps(true, MenuValue.PRIVATPERSON);
        expect(wrapper.find('.lenke').text()).toEqual('Gå til min side');
    });

    it('Skal vise riktig tekst på lenke når bruker er ARBEIDSIVER', () => {
        const wrapper = mountWithProps(true, MenuValue.ARBEIDSGIVER);
        expect(wrapper.find('.lenke').text()).toEqual(
            'Gå til min side arbeidsgiver'
        );
    });

    /* it('Skal vise riktig tabindex', () => {
        const wrapper = mountWithProps(true, MenuValue.ARBEIDSGIVER);
        // expect(wrapper.exists('a[tabindex]'))..toBe(0);
        expect(wrapper.find('.lenke').prop('tabindex')).toEqual('0');
    }); */
});
