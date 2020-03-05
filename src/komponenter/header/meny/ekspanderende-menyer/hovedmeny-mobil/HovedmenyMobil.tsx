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
import MenyIkon from '../../../../../ikoner/mobilmeny/MenyIkon';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import { toggleHovedmeny } from '../../../../../reducer/dropdown-toggle-duck';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import { MenySpinner } from '../meny-spinner/MenySpinner';

const stateSelector = (state: AppState) => ({
    meny: state.menypunkt,
    language: state.language.language,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.hovedmeny,
});

const classname = 'mobilmeny';
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
        <MenylinjeKnapp
            toggleMenu={menutoggle}
            isOpen={isOpen}
            classname={classname}
            ariaLabel={'Hovedmenyknapp'}
        >
            <MenyIkon />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK ? (
            <MobilVisningsmeny
                classname={classname}
                menyLenker={getHovedmenyNode(meny.data, language, arbeidsflate)}
                menuIsOpen={isOpen}
                togglemenu={menutoggle}
                arbeidsflate={arbeidsflate}
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
            id={classname}
        >
            {dropdownInnhold}
        </EkspanderbarMeny>
    );
};

export default HovedmenyMobil;
