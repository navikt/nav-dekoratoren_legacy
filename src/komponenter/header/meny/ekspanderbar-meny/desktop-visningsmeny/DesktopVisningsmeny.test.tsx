import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from '../../../../../redux/store';
import { DesktopVisningsmeny } from './DesktopVisningsmeny';
import { dataInitState } from '../../../../../reducer/menu-duck';
import { Language } from '../../../../../reducer/language-duck';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import DropdownVenstredel from './desktop-innhold/Dropdown-venstredel';
import DropdownHoyredel from './desktop-innhold/Dropdown-hoyredel';

configure({ adapter: new Adapter() });
const store = getStore();

const shallowWithProps = (lang: Language, arbeidsflate: MenuValue) => {
    return mount(
        <ReduxProvider store={store}>
            <DesktopVisningsmeny
                classname="meny"
                tabindex={true}
                fellesmeny={dataInitState}
                minsideMeny={dataInitState}
                lang={lang}
                arbeidsflate={arbeidsflate}
            />
        </ReduxProvider>
    );
};

describe('<DesktopVisningsmeny />', () => {
    it('Rendrer <DropdownVenstredel> komponent', () => {
        const wrapper = shallowWithProps(
            Language.NORSK,
            MenuValue.PRIVATPERSON
        );
        expect(wrapper.find(DropdownVenstredel)).toHaveLength(1);
    });

    it('Rendrer <DropdownHoyredel> komponent hvis språk er norsk og arbeidsflate er privatperson ', () => {
        const wrapper = shallowWithProps(
            Language.NORSK,
            MenuValue.PRIVATPERSON
        );
        expect(wrapper.find(DropdownHoyredel)).toHaveLength(1);
    });

    it('Skal ikke rendre <DropdownHoyredel> komponent hvis arbeidsflate er arbeidsgiver', () => {
        const wrapper = shallowWithProps(
            Language.NORSK,
            MenuValue.ARBEIDSGIVER
        );
        expect(wrapper.find(DropdownHoyredel)).toHaveLength(0);
    });

    it('Skal ikke rendre <DropdownHoyredel> komponent hvis arbeidsflate er samarbeidspartner', () => {
        const wrapper = shallowWithProps(
            Language.NORSK,
            MenuValue.SAMARBEIDSPARTNER
        );
        expect(wrapper.find(DropdownHoyredel)).toHaveLength(0);
    });

    it('Skal ikke rendre <DropdownHoyredel> komponent hvis språk er engelsk', () => {
        const wrapper = shallowWithProps(
            Language.ENGELSK,
            MenuValue.PRIVATPERSON
        );
        expect(wrapper.find(DropdownHoyredel)).toHaveLength(0);
    });

    it('Skal ikke rendre <DropdownHoyredel> komponent hvis språk er samisk', () => {
        const wrapper = shallowWithProps(
            Language.SAMISK,
            MenuValue.PRIVATPERSON
        );
        expect(wrapper.find(DropdownHoyredel)).toHaveLength(0);
    });
});
