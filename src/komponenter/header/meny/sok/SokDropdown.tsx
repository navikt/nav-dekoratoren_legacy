import React from 'react';
import { AppState } from '../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { EkspanderbarMeny } from '../ekspanderende-menyer/ekspanderbar-meny/EkspanderbarMeny';
import Sok from './Sok';
import { toggleSok } from '../../../../reducer/dropdown-toggle-duck';
import BEMHelper from '../../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../tekster/finn-tekst';
import { GACategory, triggerGaEvent } from '../../../../utils/google-analytics';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import HamburgerIkon from '../meny-knapper/hamburger-ikon/HamburgerIkon';
import SokMenyIkon from '../meny-knapper/sok-ikon/SokMenyIkon';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

const classname = 'desktop-sok-dropdown';

export const SokDropdown = () => {
    const { isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `sok-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok())
    };

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            parentClassname={classname}
            ariaLabel={'Søkeknapp'}
        >
            <SokMenyIkon isOpen={isOpen}/>
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </MenylinjeKnapp>
    );

    return (
        <EkspanderbarMeny
            classname={'desktop-dropdown'}
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <Sok />
        </EkspanderbarMeny>
    );
};
