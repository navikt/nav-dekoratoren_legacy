import React from 'react';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import { GACategory, triggerGaEvent } from '../../../../../utils/google-analytics';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../reducer/reducer';
import { Status } from '../../../../../api/api';
import { Undertittel } from 'nav-frontend-typografi';
import { UinnloggetDropdown } from './meny-dropdown/UinnloggetDropdown';
import './DesktopUinnloggetMeny.less';
import { selectMenu } from '../../../../../utils/meny-storage-utils';
import Tekst from '../../../../../tekster/finn-tekst';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { Menyknapp } from '../meny-knapp/Menyknapp';
import { toggleUinnloggetMeny } from '../../../../../reducer/dropdown-toggle-duck';
import HamburgerKnapp from '../meny-knapp/hamburger-knapp/HamburgerKnapp';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    meny: state.menypunkt,
    language: state.language.language,
    isOpen: state.dropdownToggles.uinnlogget,
});

const classname = 'desktop-uinnlogget-meny';

export const DesktopUinnloggetMeny = () => {
    const dispatch = useDispatch();
    const { arbeidsflate, meny, language, isOpen } = useSelector(stateSelector);

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleUinnloggetMeny());
    };

    const menyKnapp = (
        <Menyknapp
            toggleMenu={toggleMenu}
            clicked={isOpen}
            classname={classname}
        >
            <div className={'hamburger-knapp'}>
                <HamburgerKnapp isOpen={isOpen}/>
            </div>
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </Menyknapp>
    );

    const dropdownInnhold =
        meny.status === Status.OK
            ? (
                <UinnloggetDropdown
                    classname={classname}
                    arbeidsflate={arbeidsflate}
                    language={language}
                    menyLenker={selectMenu(meny.data, language, arbeidsflate)}
                    isOpen={isOpen}
                />
            ) : <MenySpinner />;

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

export default DesktopUinnloggetMeny
