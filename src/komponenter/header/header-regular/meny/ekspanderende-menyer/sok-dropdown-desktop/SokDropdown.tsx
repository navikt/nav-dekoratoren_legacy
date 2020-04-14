import React from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import Sok from '../../sok/Sok';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import SokMenyIkon from '../meny-knapper/ikoner/sok-ikon/SokMenyIkon';
import './SokDropdown.less';

const stateSelector = (state: AppState) => ({
    sokIsOpen: state.dropdownToggles.sok,
    menyIsOpen: state.dropdownToggles.hovedmeny,
});

const classname = 'desktop-sok-dropdown';
export const desktopSokKnappId = `${classname}-knapp-id`;

export const SokDropdown = () => {
    const { sokIsOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `sok-${sokIsOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok());
    };

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={sokIsOpen}
            classname={classname}
            id={desktopSokKnappId}
            ariaLabel={'Søkeknapp'}
        >
            <SokMenyIkon isOpen={sokIsOpen} />
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </MenylinjeKnapp>
    );

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={sokIsOpen}
            menyKnapp={knapp}
        >
            <Sok tabindex={true} />
        </EkspanderbarMeny>
    );
};
