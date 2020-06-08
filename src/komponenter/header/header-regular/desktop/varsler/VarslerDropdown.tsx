import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import { Varselvisning } from './varselvisning/Varselvisning';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/meny-knapper/varsler-knapp/VarslerKnapp';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { useDispatch } from 'react-redux';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import './VarslerDropdown.less';

const classname = 'desktop-varsler-dropdown';
export const desktopVarslerKnappId = 'desktop-varsler-dropdown-knapp-id';

type Props = {
    kbNavMainState: KbNavMain;
};

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    appBaseUrl: state.environment.APP_BASE_URL,
});

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const dispatch = useDispatch();
    const { isOpen, varsler, appBaseUrl } = useSelector(stateSelector);
    useKbNavSub(configForNodeGroup[KbNavGroup.Varsler], kbNavMainState, isOpen);

    const toggleVarslerDropdown = () => {
        if (!isOpen && varsler.uleste > 0) {
            settVarslerSomLest(appBaseUrl, varsler.nyesteId, dispatch);
        }
        gaEvent({
            category: GACategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    const knapp = (
        <VarslerKnapp
            onClick={toggleVarslerDropdown}
            isOpen={isOpen}
            varsler={varsler}
            varslerDropdownClassname={classname}
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
            <Varselvisning />
        </EkspanderbarMeny>
    );
};
