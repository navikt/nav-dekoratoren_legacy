import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
// import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { SokKnapp } from 'komponenter/header/header-regular/desktop/sok-dropdown/sok-knapp/SokKnapp';
import './SokDropdown.less';

import loadable from '@loadable/component';
const Sok = loadable(() =>
    import('komponenter/header/header-regular/common/sok/Sok')
);

export const sokDropdownClassname = 'desktop-sok-dropdown';
export const desktopSokInputId = 'desktop-sok-input';
const dropdownTransitionMs = 300;

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

type Props = {
    kbNavMainState: KbNavMain;
};

export const SokDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    const [numResults, setNumResults] = useState(0);
    useKbNavSub(
        configForNodeGroup[KbNavGroup.Sok],
        kbNavMainState,
        isOpen,
        numResults
    );

    useEffect(() => {
        const dropdownElement = document.getElementById(
            sokDropdownClassname
        ) as HTMLElement;
        if (dropdownElement) {
            if (isOpen) {
                setTimeout(() => {
                    dropdownElement.style.maxHeight = '100rem';
                    document.getElementById(desktopSokInputId)?.focus();
                }, dropdownTransitionMs);
            } else {
                dropdownElement.style.removeProperty('max-height');
            }
        }
    }, [isOpen]);

    const [renderContent, setRenderContent] = useState(false);

    useEffect(() => {
        const loadedAndOpened = renderContent || isOpen;
        setRenderContent(loadedAndOpened);
    }, [isOpen]);

    return (
        <div className={'media-tablet-desktop'}>
            <SokKnapp />
            <EkspanderbarMeny
                classname={sokDropdownClassname}
                id={sokDropdownClassname}
                isOpen={isOpen}
            >
                {renderContent && (
                    <Sok
                        isOpen={isOpen}
                        id={desktopSokInputId}
                        dropdownTransitionMs={dropdownTransitionMs}
                        numResultsCallback={setNumResults}
                    />
                )}
            </EkspanderbarMeny>
        </div>
    );
};

export default SokDropdown;
