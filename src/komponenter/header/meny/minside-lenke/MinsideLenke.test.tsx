import React from 'react';
import { mount } from 'enzyme';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import { MinsideLenke } from './MinsideLenke';

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

    it('Skal vise riktig tabindex', () => {
        const wrapper = mountWithProps(true, MenuValue.ARBEIDSGIVER);
        expect(wrapper.find('a[tabindex="0"]')).toBeTruthy();
    });
});
