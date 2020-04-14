import * as React from 'react';
import { mount } from 'enzyme';
import { createStore } from '../../../store';
import { Provider as ReduxProvider } from 'react-redux';
import Skiplinks from './Skiplinks';

const store = createStore();

describe('<Skiplinks>', () => {
    const wrapper = mount(
        <ReduxProvider store={store}>
            <Skiplinks />
        </ReduxProvider>
    );

    it('Skal rendre lenke til hovedmeny', () => {
        expect(wrapper.find('#hovedmenylenke').text()).toEqual(
            'Gå til hovedmeny'
        );
    });

    it('Skal rendre lenke til hovedinnhold', () => {
        expect(wrapper.find('#hovedinnholdlenke').text()).toEqual(
            'Gå til hovedinnhold'
        );
    });

    it('Skal rendre lenke til Søk', () => {
        expect(wrapper.find('#soklenke').text()).toEqual('Gå til søk');
    });

    it('Skal rendre 3 skiplinks-lenker', () => {
        expect(wrapper.find('.visuallyhidden.focusable')).toHaveLength(3);
    });
});
