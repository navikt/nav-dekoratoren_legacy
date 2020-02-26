import React from 'react';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import HamburgerIkon from '../../../../../ikoner/meny/HamburgerIkon';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../utils/google-analytics';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { Status } from '../../../../../api/api';
import { Undertittel } from 'nav-frontend-typografi';
import { HovedmenyDropdown } from './meny-dropdown/HovedmenyDropdown';
import './HovedmenyDesktop.less';
import { selectMenu } from '../../../../../utils/meny-storage-utils';
import Tekst from '../../../../../tekster/finn-tekst';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { Menyknapp } from '../meny-knapp/Menyknapp';
import { toggleHovedmeny } from '../../../../../reducer/dropdown-toggle-duck';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    meny: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.hovedmeny,
});

const classname = 'hovedmeny-desktop';
export const hovedmenyDesktopClassname = classname;

export const HovedmenyDesktop = () => {
    const dispatch = useDispatch();
    const { arbeidsflate, meny, language, isOpen } = useSelector(stateSelector);

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const menyKnapp = (
        <Menyknapp
            toggleMenu={toggleMenu}
            clicked={isOpen}
            classname={classname}
        >
            <HamburgerIkon ikonClass="hamburger-ikon" />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </Menyknapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <HovedmenyDropdown
                classname={classname}
                arbeidsflate={arbeidsflate}
                language={language}
                menyLenker={selectMenu(meny.data, language, arbeidsflate)}
                isOpen={isOpen}
            />
        ) : (
            <MenySpinner />
        );

    return (
        <EkspanderbarMeny
            classname={classname}
            isOpen={isOpen}
            menyKnapp={menyKnapp}
        >
            {dropdownInnhold}
        </EkspanderbarMeny>
    );
};

export default HovedmenyDesktop;
