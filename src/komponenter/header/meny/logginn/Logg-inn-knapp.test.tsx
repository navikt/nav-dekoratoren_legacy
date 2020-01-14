import * as React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from '../../../../redux/store';
import Tekst from '../../../../tekster/finn-tekst';
import { LoggInnKnapp } from './Logg-inn-knapp';

configure({ adapter: new Adapter() });
const store = getStore();

const mountWithProps = (erInnlogget: boolean) => {
    return mount(
        <ReduxProvider store={store}>
            <LoggInnKnapp erInnlogget={erInnlogget} />
        </ReduxProvider>
    );
};

describe('<LoggInnKnapp />', () => {
    it('Rendrer to <Tekst> komponenter (en for mobil og en for tablet/desktop)', () => {
        const wrapper = mountWithProps(true);
        expect(wrapper.find(Tekst)).toHaveLength(2);
    });

    it('Teksten på knappen er LOGG INN når bruker er uinnlogget', () => {
        const wrapper = mountWithProps(false);
        expect(
            wrapper
                .find('.knappetekst')
                .at(0)
                .text()
        ).toEqual('Logg inn');

        expect(
            wrapper
                .find('.login-knapp')
                .at(0)
                .text()
        ).toEqual('Logg inn');
    });

    it('Teksten på knappen er LOGG UT når bruker er innlogget', () => {
        const wrapper = mountWithProps(true);
        expect(
            wrapper
                .find('.knappetekst')
                .first()
                .text()
        ).toEqual('Logg ut');
        expect(
            wrapper
                .find('.login-knapp')
                .first()
                .text()
        ).toEqual('Logg ut');
    });
});
