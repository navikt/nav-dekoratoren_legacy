import React from 'react';
import { Ekspanderbarmeny } from '../Ekspanderbarmeny';
import HamburgerIkon from '../../../../../ikoner/meny/HamburgerIkon';
import { GACategory, triggerGaEvent } from '../../../../../utils/google-analytics';
import { ActionType } from '../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { Status } from '../../../../../api/api';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { UinnloggetDropdown } from './meny-uinnlogget/UinnloggetDropdown';

import './DesktopVisningsmeny.less';
import { selectMenu } from '../../../../../utils/meny-storage-utils';
import Tekst from '../../../../../tekster/finn-tekst';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    meny: state.menypunkt,
    language: state.language.language,
    isOpen: state.uinnloggetMenyIsOpen
});

const Spinner = () => (
    <div className={'spinner-container'}>
        <Normaltekst>{'Laster meny-innhold...'}</Normaltekst>
        <NavFrontendSpinner/>
    </div>
);

const menyKnappVisning = (
    <>
        <HamburgerIkon ikonClass="hamburger-ikon"/>
        <Undertittel>
            <Tekst id="meny-knapp" />
        </Undertittel>
    </>
);

export const DesktopUinnloggetMeny = () => {
    const menutoggle = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`
        });
        dispatch({ type: ActionType.MENY_UINNLOGGET_TOGGLE });
    };

    const className = 'desktop-uinnlogget-meny';
    const dispatch = useDispatch();
    const { arbeidsflate, meny, language, isOpen } = useSelector(stateSelector);
    const menyLenker = selectMenu(meny.data, language, arbeidsflate);

    return (
        <Ekspanderbarmeny
            classname={className}
            isOpen={isOpen}
            language={language}
            menyKnappVisning={menyKnappVisning}
            toggleFunc={menutoggle}
        >
            {meny.status === Status.OK
                ? (
                    <UinnloggetDropdown
                        classname={className}
                        arbeidsflate={arbeidsflate}
                        language={language}
                        menyLenker={menyLenker}
                        isOpen={isOpen}
                    />
                )
                : <Spinner/>
            }
        </Ekspanderbarmeny>
    )
};
