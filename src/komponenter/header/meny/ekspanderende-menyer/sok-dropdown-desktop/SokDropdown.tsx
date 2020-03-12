import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import Sok from '../../sok/Sok';
import { toggleSok } from '../../../../../reducer/dropdown-toggle-duck';
import { Undertittel } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../utils/google-analytics';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import SokMenyIkon from '../meny-knapper/ikoner/sok-ikon/SokMenyIkon';
import './SokDropdown.less';
import { NodeGroup } from '../../../../../utils/keyboard-navigation/kb-navigation';
import { KbNavigationWrapper } from '../../../../../utils/keyboard-navigation/KbNavigationWrapper';
import { configForNodeGroup } from '../../../../../utils/keyboard-navigation/kb-navigation-setup';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

const nodeGroup = NodeGroup.Sok;

const classname = 'desktop-sok-dropdown';
export const desktopSokDropdownClassname = classname;
export const desktopSokKnappId = `${classname}-knapp-id`;

export const SokDropdown = () => {
    const { isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `sok-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok());
    };

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            id={desktopSokKnappId}
            ariaLabel={'Søkeknapp'}
        >
            <SokMenyIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </MenylinjeKnapp>
    );

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <KbNavigationWrapper
                config={configForNodeGroup[nodeGroup]}
                isEnabled={isOpen}
            >
                <Sok />
            </KbNavigationWrapper>
        </EkspanderbarMeny>
    );
};
