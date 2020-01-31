import React from 'react';
import { mount } from 'enzyme';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from '../../../../../redux/store';
import { DesktopVisningsmeny } from './DesktopVisningsmeny';
import { dataInitState } from '../../../../../reducer/menu-duck';
import { Language } from '../../../../../reducer/language-duck';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import DropdownVenstredel from './desktop-innhold/Dropdown-venstredel';

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
});
