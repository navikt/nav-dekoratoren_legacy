import React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'store';
import { dataInitState } from 'store/reducers/menu-duck';
import { Locale } from 'store/reducers/language-duck';
import { MenuValue } from 'utils/meny-storage-utils';
import { Hovedseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/hoved-seksjon/Hovedseksjon';
import { Toppseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/topp-seksjon/Toppseksjon';
import { Bunnseksjon } from 'komponenter/header/header-regular/desktop/hovedmeny/bunn-seksjon/Bunnseksjon';
import HovedmenyInnhold from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyInnhold';
import { kbNavDummy } from 'utils/jest/testObjects';

const store = createStore();

const shallowWithProps = (lang: Locale, arbeidsflate: MenuValue) => {
    return mount(
        <ReduxProvider store={store}>
            <HovedmenyInnhold
                arbeidsflate={arbeidsflate}
                menyPunkter={dataInitState}
                language={lang}
                isOpen={true}
                kbNavMainState={kbNavDummy}
            />
        </ReduxProvider>
    );
};

describe('<HovedmenyDropdown />', () => {
    const wrapper = shallowWithProps(Locale.BOKMAL, MenuValue.PRIVATPERSON);
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
