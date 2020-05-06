import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import { Varselvisning } from './varselvisning/Varselvisning';
import { MenuValue } from 'utils/meny-storage-utils';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from 'komponenter/header/header-regular/meny/ekspanderende-menyer/meny-knapper/varsler-knapp/VarslerKnapp';
import './VarslerDropdown.less';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
});

const classname = 'desktop-varsler-dropdown';
export const desktopVarslerKnappId = 'desktop-varsler-dropdown-knapp-id';

type Props = {
    kbNavMainState: KbNavMain;
};

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen, innloggetStatus, arbeidsflate } = useSelector(
        stateSelector
    );
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);

    if (
        !innloggetStatus.authenticated ||
        arbeidsflate !== MenuValue.PRIVATPERSON
    ) {
        return null;
    }

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={isOpen}
            menyKnapp={<VarslerKnapp id={desktopVarslerKnappId} />}
        >
            <Varselvisning />
        </EkspanderbarMeny>
    );
};
