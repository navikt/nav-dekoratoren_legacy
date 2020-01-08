import * as React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider as ReduxProvider } from 'react-redux';
import LoggInnKnapp from './Logg-inn-knapp';
import getStore from '../../../../redux/store';
import Tekst from '../../../../tekster/finn-tekst';

configure({ adapter: new Adapter() });
const store = getStore();

/* function getJSXElement() {
    return (
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );
} */

const wrapper = () => {
    return;
    mount(
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );
};

test('renders two <Tekst> components (en for mobil og en for tablet/desktop)', () => {
    const wrapper = mount(
        <ReduxProvider store={store}>
            <LoggInnKnapp />
        </ReduxProvider>
    );

    expect(wrapper.find(Tekst)).toHaveLength(2);
});

/* describe('<LoggInnKnapp />', function() {
    it('Skal vise ...', () => {
        const wrapper = shallow(
            <ReduxProvider store={store}>
                <LoggInnKnapp />
            </ReduxProvider>
        );
        // const logginnComponent = wrapper.dive().dive();
        // logginnComponent.setProps({ erInnlogget: false });
        // expect(logginnComponent.props('erInnlogget')).toEqual(false);
        // wrapper.debug();
        // wrapper.setProps({ erInnlogget: false });
        // expect(wrapper.find('.login-container').text()).toEqual('Logg ut');
        // expect(wrapper.find('.login-container').
        test('renders two <Tekst> components', () => {
            const wrapper = shallow(
                <ReduxProvider store={store}>
                    <LoggInnKnapp />
                </ReduxProvider>
            );

            expect(wrapper.dive().find(Tekst)).toBe(2);
        });
    });
}); */
