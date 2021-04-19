import * as React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import Skiplinks from 'komponenter/header/common/skiplinks/Skiplinks';

const store = createStore();

describe('<Skiplinks>', () => {
    const wrapper = mount(
        <ReduxProvider store={store}>
            <Skiplinks />
        </ReduxProvider>
    );

    it('Skal rendre 2 skiplinks for mobil', () => {
        expect(wrapper.find('.skiplink.skiplink__mobil')).toHaveLength(2);
    });

    it('Skal rendre 2 skiplinks for desktop', () => {
        expect(wrapper.find('.skiplink.skiplink__desktop')).toHaveLength(2);
    });

    it('Skal rendre 4 skiplinks totalt', () => {
        expect(wrapper.find('.skiplink')).toHaveLength(4);
    });

    describe('Rendrer med #maincontent element', () => {
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);

        const wrapperWithMaincontent = mount(
            <ReduxProvider store={store}>
                <div id="maincontent" />
                <Skiplinks />
            </ReduxProvider>,
            { attachTo: document.getElementById('container') }
        );

        it('Skal rendre 5 skiplinks totalt', () => {
            expect(wrapperWithMaincontent.find('.skiplink')).toHaveLength(5);
        });
    });
});
