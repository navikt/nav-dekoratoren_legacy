import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { Varselvisning } from './varselvisning/Varselvisning';
import { MenuValue } from 'utils/meny-storage-utils';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/meny-knapper/varsler-knapp/VarslerKnapp';
import './VarslerDropdown.less';

const classname = 'desktop-varsler-dropdown';
export const desktopVarslerKnappId = 'desktop-varsler-dropdown-knapp-id';

type Props = {
    kbNavMainState: KbNavMain;
};

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const isOpen = useSelector(
        (state: AppState) => state.dropdownToggles.varsler
    );
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);

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
