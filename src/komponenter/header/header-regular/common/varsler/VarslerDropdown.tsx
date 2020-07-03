import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import loadable from '@loadable/component';
import { varslerDropdownClassname } from 'utils/id-repo';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from './varsler-knapp/VarslerKnapp';
import { useState } from 'react';
import { useEffect } from 'react';
import './VarslerDropdown.less';

const Varselvisning = loadable(() => import('./varselvisning/Varselvisning'));

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
});

type Props = {
    kbNavMainState: KbNavMain;
};

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);
    const [renderContent, setRenderContent] = useState(false);

    useEffect(() => {
        const opened = renderContent || isOpen;
        setRenderContent(opened);
    }, [isOpen]);

    return (
        <>
            <VarslerKnapp />
            <EkspanderbarMeny
                classname={varslerDropdownClassname}
                id={varslerDropdownClassname}
                isOpen={isOpen}
            >
                {renderContent && <Varselvisning setKbId={true} />}
            </EkspanderbarMeny>
        </>
    );
};

export default VarslerDropdown;
