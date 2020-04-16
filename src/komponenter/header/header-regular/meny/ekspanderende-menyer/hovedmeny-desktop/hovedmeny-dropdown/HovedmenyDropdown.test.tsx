import React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'store';
import { dataInitState } from 'store/reducers/menu-duck';
import { Language } from 'store/reducers/language-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import HovedmenyDropdown from './HovedmenyDropdown';
import { Hovedseksjon } from './hoved-seksjon/Hovedseksjon';
import { Toppseksjon } from './topp-seksjon/Toppseksjon';
import { Bunnseksjon } from './bunn-seksjon/Bunnseksjon';

const { store } = createStore();

const shallowWithProps = (lang: Language, arbeidsflate: MenuValue) => {
    return mount(
        <ReduxProvider store={store}>
            <HovedmenyDropdown
                classname={'meny'}
                isOpen={true}
                arbeidsflate={arbeidsflate}
                language={lang}
                menyLenker={dataInitState}
            />
        </ReduxProvider>
    );
};

describe('<HovedmenyDropdown />', () => {
    const wrapper = shallowWithProps(Language.NORSK, MenuValue.PRIVATPERSON);
    it('Rendrer <Toppseksjon> komponent', () => {
        expect(wrapper.find(Toppseksjon)).toHaveLength(1);
    });
    it('Rendrer <Hovedseksjon> komponent', () => {
        expect(wrapper.find(Hovedseksjon)).toHaveLength(1);
    });
    it('Rendrer <Bunnseksjon> komponent', () => {
        expect(wrapper.find(Bunnseksjon)).toHaveLength(1);
    });
});
