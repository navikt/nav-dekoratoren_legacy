import React from 'react';
import { useEffect } from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import Sok from 'komponenter/header/header-regular/common/sok/Sok';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { GACategory, gaEvent } from 'utils/google-analytics';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { SokKnapp } from 'komponenter/header/header-regular/common/meny-knapper/sok-knapp/SokKnapp';
import './SokDropdown.less';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

const classname = 'desktop-sok-dropdown';
export const desktopSokKnappId = 'desktop-sok-knapp';
export const desktopSokInputId = 'desktop-sok-input';
const dropdownTransitionMs = 300;

type Props = {
    kbNavMainState: KbNavMain;
};

export const SokDropdown = ({ kbNavMainState }: Props) => {
    const { isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();
    useKbNavSub(configForNodeGroup[KbNavGroup.Sok], kbNavMainState, isOpen);

    useEffect(() => {
        const dropdownElement = document.getElementById(
            classname
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

    const toggleMenu = () => {
        gaEvent({
            category: GACategory.Header,
            action: `sok-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok());
    };

    const knapp = (
        <SokKnapp
            onClick={toggleMenu}
            isOpen={isOpen}
            sokDropdownClassname={classname}
            id={desktopSokKnappId}
        />
    );

    return (
        <EkspanderbarMeny
            classname={classname}
            id={classname}
            isOpen={isOpen}
            menyKnapp={knapp}
        >
            <Sok
                tabindex={true}
                isOpen={isOpen}
                id={desktopSokInputId}
                dropdownTransitionMs={dropdownTransitionMs}
            />
        </EkspanderbarMeny>
    );
};
