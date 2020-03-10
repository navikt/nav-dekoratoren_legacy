import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../../../../../api/api';
import { getHovedmenyNode } from '../../../../../utils/meny-storage-utils';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import MobilVisningsmeny from './meny-dropdown/MobilVisningsmeny';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../utils/google-analytics';
import { Undertittel } from 'nav-frontend-typografi';
import { finnTekst } from '../../../../../tekster/finn-tekst';
import {
    toggleHovedmeny,
    toggleHovedOgUndermenyVisning,
    toggleUndermenyVisning,
    toggleVarselVisning,
} from '../../../../../reducer/dropdown-toggle-duck';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { Language } from '../../../../../reducer/language-duck';
import BEMHelper from '../../../../../utils/bem';
import HamburgerKnapp from '../meny-knapp/hamburger-knapp/HamburgerKnapp';
import { dataInitState } from '../../../../../reducer/menu-duck';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    hovedIsOpen: state.dropdownToggles.hovedmeny,
    underIsOpen: state.dropdownToggles.undermeny,
    varselIsOpen: state.dropdownToggles.varsel,
});

const classname = 'mobilmeny';
export const mobilHovedmenyKnappId = `${classname}-knapp-id`;
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
    const {
        meny,
        language,
        arbeidsflate,
        underIsOpen,
        hovedIsOpen,
        varselIsOpen,
    } = useSelector(stateSelector);

    const menutoggle = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${underIsOpen ? 'close' : 'open'}`,
        });

        console.log('hovedIsOpen', hovedIsOpen, '!underIsOpen', !underIsOpen);
        dispatch(
            hovedIsOpen || !underIsOpen
                ? toggleHovedOgUndermenyVisning()
                : toggleUndermenyVisning()
        );
        if (varselIsOpen) {
            dispatch(toggleVarselVisning());
        }
    };

    const hovedmenutoggle = () => {
        dispatch(toggleHovedmeny());
    };

    const menyKnapp = (
        <MenylinjeKnapp
            toggleMenu={menutoggle}
            isOpen={underIsOpen}
            classname={classname}
            id={mobilHovedmenyKnappId}
            ariaLabel={'Hovedmenyknapp'}
        >
            <HamburgerKnapp isOpen={underIsOpen} />
            <Undertittel>
                {textTransformFirstLetterToUppercase('meny-knapp', language)}
            </Undertittel>
        </MenylinjeKnapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <MobilVisningsmeny
                classname={classname}
                menyLenker={
                    getHovedmenyNode(meny.data, language, arbeidsflate) ||
                    dataInitState
                }
                menuIsOpen={hovedIsOpen}
                underMenuIsOpen={underIsOpen}
                varslerIsOpen={varselIsOpen}
                togglemenu={menutoggle}
                togglehovedmenu={hovedmenutoggle}
                lang={language}
            />
        ) : (
            <MenySpinner />
        );

    return (
        <EkspanderbarMeny
            classname={classname}
            isOpen={hovedIsOpen}
            menyKnapp={menyKnapp}
            id={classname}
        >
            {dropdownInnhold}
        </EkspanderbarMeny>
    );
};

export default HovedmenyMobil;
