import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from '../../../../redux/store';
import Tekst from '../../../../tekster/finn-tekst';
import { DesktopVisningsmeny } from './DesktopVisningsmeny';
import { MenySeksjon } from '../../../../../reducer/menu-duck';
import { Language } from '../../../../../reducer/language-duck';
import { MenuValue } from '../../../../../utils/meny-storage-utils';

configure({ adapter: new Adapter() });
const store = getStore();

const mountWithProps = (erInnlogget: boolean) => {
    return mount(
        <ReduxProvider store={store}>
            <DesktopVisningsmeny
                classname=""
                tabindex={true}
                fellesmeny={MenySeksjon}
                minsideMeny={MenySeksjon}
                lang={Language]
                arbeidsflate = {MenuValue}
            />
        </ReduxProvider>
    );
};

describe('<LoggInnKnapp />', () => {
    it('Rendrer to <Tekst> komponenter (en for mobil og en for tablet/desktop)', () => {
        const wrapper = mountWithProps(true);
        expect(wrapper.find(Tekst)).toHaveLength(2);
    });
});
