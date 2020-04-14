import React from 'react';
import { AppState } from 'reducer/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from 'api/api';
import { getHovedmenyNode, getMinsideMenyNode } from 'utils/meny-storage-utils';
import MobilVisningsmeny from './meny-dropdown/MobilVisningsmeny';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { finnTekst } from 'tekster/finn-tekst';
import { toggleUndermenyVisning } from 'reducer/dropdown-toggle-duck';
import { toggleHovedmeny } from 'reducer/dropdown-toggle-duck';
import { Language } from 'reducer/language-duck';
import { dataInitState } from 'reducer/menu-duck';
import HamburgerKnapp from '../meny-knapp/hamburger-knapp/HamburgerKnapp';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import MenySpinner from '../meny-spinner/MenySpinner';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

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

export const TextTransformFirstLetterToUppercase = ({
    text,
    lang,
}: {
    text: string;
    lang: Language;
}) => {
    const txt = finnTekst(text, lang);
    const output = txt
        .charAt(0)
        .toUpperCase()
        .concat(txt.slice(1).toLowerCase());
    return <>{output}</>;
};

const HovedmenyMobil = () => {
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

        dispatch(toggleUndermenyVisning());
    };

    const hovedmenutoggle = () => {
        dispatch(toggleHovedmeny());
    };

    const menyKnapp = (
        <>
            <MenylinjeKnapp
                toggleMenu={hovedmenutoggle}
                isOpen={hovedIsOpen}
                classname={classname}
                id={mobilHovedmenyKnappId}
                ariaLabel={'Hovedmenyknapp'}
            >
                <>
                    <HamburgerKnapp isOpen={hovedIsOpen} />
                    <Undertittel>
                        <TextTransformFirstLetterToUppercase
                            text="meny-knapp"
                            lang={language}
                        />
                    </Undertittel>
                </>
            </MenylinjeKnapp>
        </>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <MobilVisningsmeny
                classname={classname}
                menyLenker={
                    getHovedmenyNode(meny.data, language, arbeidsflate) ||
                    dataInitState
                }
                minsideLenker={
                    getMinsideMenyNode(meny.data, language) || dataInitState
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
        <>
            <EkspanderbarMeny
                classname={classname}
                isOpen={hovedIsOpen || underIsOpen || varselIsOpen}
                menyKnapp={menyKnapp}
                id={classname}
            >
                {dropdownInnhold}
            </EkspanderbarMeny>
        </>
    );
};

export default HovedmenyMobil;
