/* tslint:disable*/
import * as React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MinsideLenke from './MinsideLenke';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { MenuValue } from '../../../../utils/meny-storage-utils';
import { reducer } from '../../../../reducer/reducer';

const state = (innloggingsstatus: boolean, arbeidsflate: MenuValue) => {
    return {
        innloggingsstatus: {
            data: {
                authenticated: { innloggingsstatus },
                name: '',
                securityLevel: '',
            },
        },
        arbeidsflate: {
            status: { arbeidsflate },
        },
    };
};

/* const innloggetState = {
    innloggingsstatus: {
        data: {
            authenticated: true,
            name: '',
            securityLevel: '',
        },
    },
    arbeidsflate: {
        status: MenuValue.PRIVATPERSON,
    },
};

const samarbeidspartnertState = {
    innloggingsstatus: {
        data: {
            authenticated: true,
            name: '',
            securityLevel: '',
        },
    },
    arbeidsflate: {
        status: MenuValue.SAMARBEIDSPARTNER,
    },
}; */

configure({ adapter: new Adapter() });

/* function mountWith(node: any, store: any) {
    return mount(<ReduxProvider store={store}>{node}</ReduxProvider>);
} */

const getJSXElement = (tabindex: boolean, store: any) => {
    // @ts-ignore
    return (
        <ReduxProvider store={store}>
            <MinsideLenke tabindex={tabindex} />
        </ReduxProvider>
    );
};

describe('<MinsideLenke>', () => {
    it('Skal rendre container-div', () => {
        const store = createStore(reducer, state(false, MenuValue.IKKEVALGT));
        const wrapper = mount(getJSXElement(true, store));
        expect(wrapper.find('div.minside-lenke')).toHaveLength(1);
    });

    it('Skal ikke vise minsidelenke når bruker er PRIVATPERSON og uinnlogget', () => {
        const store = createStore(reducer, uinnloggetState);
        const wrapper = mount(getJSXElement(true, store));
        expect(wrapper.find('div.minside-lenke.lenke')).toHaveLength(0);
    });

    it('Skal vise minsidelenke når bruker er PRIVATPERSON og innlogget', () => {
        const store = createStore(reducer, innloggetState);
        const wrapper = mount(getJSXElement(true, store));
        expect(wrapper.find('div.minside-lenke.lenke')).toHaveLength(1);
    });

    it('Skal ikke vise minsidelenke når bruker er SAMARBEIDSPARTNER og innlogget', () => {
        const store = createStore(reducer, samarbeidspartnertState);
        const wrapper = mount(getJSXElement(true, store));
        expect(wrapper.find('div.minside-lenke.lenke')).toHaveLength(0);
    });
});
