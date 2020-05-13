import * as React from 'react';
import { mount } from 'enzyme';
import { Language } from 'store/reducers/language-duck';
import { Provider } from 'react-redux';
import { reducers } from 'store/reducers';
import { createStore, Store } from 'redux';
import MobilMenylinje from './MobilMenylinje';
import NavLogoRod from 'ikoner/meny/NavLogoRod';
import HovedmenyMobil from './hovedmeny/HovedmenyMobil';
import { LoggInnKnappMobil } from './logg-inn/LoggInnKnappMobil';
import { ActionType } from '../../../../store/actions';
import { Status } from '../../../../api/api';

const store = createStore(reducers);

const getWrapper = (store: Store) =>
    mount(
        <Provider store={store}>
            <MobilMenylinje language={Language.NORSK} />
        </Provider>
    );

store.dispatch({
    type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
    status: Status.OK,
    data: {
        authenticated: false,
    },
});

describe('<MobilMenylinje /> sjekk at komponent finner logo', () => {
    it('Skal rendre <NavLogoRod> komponent', () => {
        expect(getWrapper(store).find(NavLogoRod)).toHaveLength(1);
    });
});

describe('<LoggInnKnappMobil/> sjekk at komponent finner logg-inn knapp', () => {
    it('Skal rendre <LoggInnKnappMobil/> komponent', () => {
        const wrapper = getWrapper(store);
        expect(wrapper.find(LoggInnKnappMobil)).toHaveLength(1);
    });
});

describe('<HovedmenyMobil/> sjekk at komponent finner Varselbjelle', () => {
    it('skal rendre <HovedmenyMobil/> komponent', () => {
        const wrapper = getWrapper(store);
        expect(wrapper.find(HovedmenyMobil)).toHaveLength(1);
    });
});
