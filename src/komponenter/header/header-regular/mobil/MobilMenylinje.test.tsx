import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducers } from 'store/reducers';
import { createStore, Store } from 'redux';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import LoggInnKnapp from 'komponenter/header/header-regular/common/knapper/logg-inn-knapp/LoggInnKnapp';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { HovedmenyMobil } from 'komponenter/header/header-regular/mobil/hovedmeny/HovedmenyMobil';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';

const store = createStore(reducers);

const getWrapper = (store: Store) =>
    mount(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );

describe('<MobilMenylinje /> sjekk at komponent finner logo', () => {
    it('Skal rendre <NavLogoLenke> komponent', () => {
        expect(getWrapper(store).find(NavLogoLenke)).toHaveLength(1);
    });
});

describe('<LoggInnKnapp/> sjekk at komponent finner logg-inn knapp', () => {
    store.dispatch({
        type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
        status: Status.OK,
        data: {
            authenticated: false,
        },
    });

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
