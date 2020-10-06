import * as React from 'react';
import SokKnappDesktop from 'komponenter/header/header-regular/desktop/sok-dropdown/SokDropdown';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from 'store/reducers';
import { mount } from 'enzyme';
import NavLogoLenke from 'komponenter/common/nav-logo/NavLogoLenke';
import { HeaderMenylinje } from 'komponenter/header/header-regular/HeaderMenylinje';
import { HovedmenyKnapp } from 'komponenter/header/header-regular/common/meny-knapp/hovedmeny-knapp/HovedmenyKnapp';
import { ActionType } from 'store/actions';
import { Status } from 'api/api';
import LoggInnKnapp from 'komponenter/header/header-regular/common/logg-inn/LoggInnKnapp';
import { MenuValue } from 'utils/meny-storage-utils';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/varsler/varsler-knapp/VarslerKnapp';
import Minsidemeny from 'komponenter/header/header-regular/desktop/minside-meny/Minsidemeny';
import { innloggetAction } from 'utils/jest/testObjects';
import { uInnloggetAction } from 'utils/jest/testObjects';
import { setParams } from '../../../store/reducers/environment-duck';

const store = createStore(reducers);

const shallowWithProps = () =>
    mount(
        <Provider store={store}>
            <HeaderMenylinje />
        </Provider>
    );

describe('<HeaderMenylinje>', () => {
    it('Skal rendre <NavLogoLenke> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(NavLogoLenke)).toHaveLength(1);
    });

    it('Skal rendre <HovedmenyKnapp> for mobil og desktop', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(HovedmenyKnapp)).toHaveLength(2);
    });

    it('Skal rendre <SokKnappDesktop> komponent', () => {
        const wrapper = shallowWithProps();
        expect(wrapper.find(SokKnappDesktop)).toHaveLength(1);
    });

    it('Skal rendre <LoggInnKnapp/> komponent', () => {
        store.dispatch({
            type: ActionType.HENT_INNLOGGINGSSTATUS_OK,
            status: Status.OK,
            data: {
                authenticated: false,
            },
        });
        const wrapper = shallowWithProps();
        expect(wrapper.find(LoggInnKnapp)).toHaveLength(1);
    });

    it('Skal rendre <VarslerKnapp /> og <Minsidemeny /> komponent for innlogget personbruker', () => {
        store.dispatch(setParams({ CONTEXT: MenuValue.PRIVATPERSON }));
        store.dispatch(innloggetAction);
        const wrapper = shallowWithProps();
        expect(wrapper.find(VarslerKnapp)).toHaveLength(1);
        expect(wrapper.find(Minsidemeny)).toHaveLength(1);
    });

    it('Skal ikke rendre <VarslerKnapp /> og <Minsidemeny /> komponent for uinnlogget personbruker', () => {
        store.dispatch(setParams({ CONTEXT: MenuValue.PRIVATPERSON }));
        store.dispatch(uInnloggetAction);
        const wrapper = shallowWithProps();
        expect(wrapper.find(VarslerKnapp)).toHaveLength(0);
        expect(wrapper.find(Minsidemeny)).toHaveLength(0);
    });
});
