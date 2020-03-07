import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../../../../../api/api';
import { getMenuNode } from '../../../../../utils/meny-storage-utils';
import Menyknapp from '../meny-knapp/Menyknapp';
import MobilVisningsmeny from './meny-dropdown/MobilVisningsmeny';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../utils/google-analytics';
import { Undertittel } from 'nav-frontend-typografi';
import { finnTekst } from '../../../../../tekster/finn-tekst';
import { toggleHovedmeny } from '../../../../../reducer/dropdown-toggle-duck';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { Language } from '../../../../../reducer/language-duck';
import BEMHelper from '../../../../../utils/bem';
import HamburgerKnapp from '../meny-knapp/hamburger-knapp/HamburgerKnapp';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.hovedmeny,
});

const classname = 'mobilmeny';
const cls = BEMHelper('hamburger-knapp');

export const textTransformFirstLetterToUppercase = (
    text: string,
    lang: Language
) => {
    const txt = finnTekst(text, lang);
    return txt
        .charAt(0)
        .toUpperCase()
        .concat(txt.slice(1).toLowerCase());
};
export const hovedmenyMobilClassname = classname;

export const HovedmenyMobil = () => {
    const dispatch = useDispatch();
    const { meny, language, arbeidsflate, isOpen } = useSelector(stateSelector);

    const menutoggle = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    const menyKnapp = (
        <Menyknapp
            toggleMenu={menutoggle}
            clicked={isOpen}
            classname={classname}
        >
            <HamburgerKnapp isOpen={isOpen} />
            <Undertittel>
                {textTransformFirstLetterToUppercase('meny-knapp', language)}
            </Undertittel>
        </Menyknapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <MobilVisningsmeny
                classname={classname}
                menyLenker={getMenuNode(meny.data, language, arbeidsflate)}
                menuIsOpen={isOpen}
                togglemenu={menutoggle}
                lang={language}
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

export default HovedmenyMobil;
