import React from 'react';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../utils/google-analytics';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { Status } from '../../../../../api/api';
import { Undertittel } from 'nav-frontend-typografi';
import { HovedmenyDropdown } from './meny-dropdown/HovedmenyDropdown';
import { getMenuNode } from '../../../../../utils/meny-storage-utils';
import Tekst from '../../../../../tekster/finn-tekst';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { toggleHovedmeny } from '../../../../../reducer/dropdown-toggle-duck';
import HamburgerIkon from '../../meny-knapper/hamburger-ikon/HamburgerIkon';
import BEMHelper from '../../../../../utils/bem';
import MenylinjeKnapp from '../../meny-knapper/MenylinjeKnapp';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    meny: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.hovedmeny,
});

const classname = 'desktop-hovedmeny';
export const hovedmenyDesktopClassname = classname;

export const HovedmenyDesktop = () => {
    const { arbeidsflate, meny, language, isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            parentClassname={classname}
            ariaLabel={'Hovedmenyknapp'}
        >
            <HamburgerIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <HovedmenyDropdown
                classname={classname}
                arbeidsflate={arbeidsflate}
                language={language}
                menyLenker={getMenuNode(meny.data, language, arbeidsflate)}
                isOpen={isOpen}
            />
        ) : (
            <MenySpinner />
        );

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={'desktop-dropdown'}
            id={classname}
        >
            {dropdownInnhold}
        </EkspanderbarMeny>
    );
};

export default HovedmenyDesktop;
