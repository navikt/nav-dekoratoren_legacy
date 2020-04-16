import * as React from 'react';
import { mount } from 'enzyme';
import { Language } from 'store/reducers/language-duck';
import { Provider } from 'react-redux';
import { reducers } from 'store/reducers';
import { createStore, Store } from 'redux';
import MobilMenylinje from './MobilMenylinje';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import LoggInnKnapp from './logginn/Logg-inn-knapp';
import HovedmenyMobil from './ekspanderende-menyer/hovedmeny-mobil/HovedmenyMobil';

const { store } = createStore(reducers);

const getWrapper = (store: Store) =>
    mount(
        <Provider store={store}>
            <MobilMenylinje language={Language.NORSK} />
        </Provider>
    );

describe('<MobilMenylinje /> sjekk at komponent finner logo', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        expect(getWrapper(store).find(NavLogoRod)).toHaveLength(1);
    });
});

describe('<LoggInnKnapp/> sjekk at komponent finner logg-inn knapp', () => {
    it('Skal rendre <LoggInnKnapp/> komponent', () => {
        const wrapper = getWrapper(store);
        expect(wrapper.find(LoggInnKnapp)).toHaveLength(1);
    });
});

describe('<HovedmenyMobil/> sjekk at komponent finner Varselbjelle', () => {
    it('skal rendre <HovedmenyMobil/> komponent', () => {
        const wrapper = getWrapper(store);
        expect(wrapper.find(HovedmenyMobil)).toHaveLength(1);
    });
});
