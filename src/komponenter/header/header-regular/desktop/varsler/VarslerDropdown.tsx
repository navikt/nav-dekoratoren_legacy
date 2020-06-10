import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { Varselvisning } from './varselvisning/Varselvisning';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/knapper/varsler-knapp/VarslerKnapp';
import './VarslerDropdown.less';

const classname = 'desktop-varsler-dropdown';
export const desktopVarslerKnappId = 'desktop-varsler-dropdown-knapp-id';

type Props = {
    kbNavMainState: KbNavMain;
};

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
});

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);

    const knapp = (
        <VarslerKnapp
            dropdownClassname={classname}
            id={desktopVarslerKnappId}
        />
    );

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <Varselvisning setKbId={true} />
        </EkspanderbarMeny>
    );
};
