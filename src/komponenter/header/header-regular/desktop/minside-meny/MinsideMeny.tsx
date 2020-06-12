import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { getMinsideMenyNode } from 'utils/meny-storage-utils';
import { Status } from 'api/api';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import MinsideMenyInnhold from './MinsideMenyInnhold';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './MinsideMeny.less';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    isOpen: state.dropdownToggles.minside,
    language: state.language.language,
    menyPunkter: state.menypunkt,
});

export const minsideDropdownClassname = 'desktop-minside-meny';

type Props = {
    kbNavMainState: KbNavMain;
};

export const MinsideMeny = ({ kbNavMainState }: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { innloggetStatus } = useSelector(stateSelector);
    const { isOpen, language, menyPunkter } = useSelector(stateSelector);
    useKbNavSub(
        configForNodeGroup[KbNavGroup.MinsideMeny],
        kbNavMainState,
        isOpen
    );

    const minsideMenyPunkter = getMinsideMenyNode(menyPunkter.data, language);

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !minsideMenyPunkter?.hasChildren) {
        return null;
    }

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            classname={minsideDropdownClassname}
            id={minsideDropdownClassname}
        >
            {menyPunkter.status === Status.OK ? (
                <MinsideMenyInnhold
                    classname={minsideDropdownClassname}
                    isOpen={isOpen}
                    menyLenker={minsideMenyPunkter}
                    dittNavUrl={environment.DITT_NAV_URL}
                    brukernavn={innloggetStatus.name?.toLowerCase() || ''}
                    authLevel={innloggetStatus.securityLevel}
                />
            ) : (
                <Spinner tekstId={'meny-loading'} />
            )}
        </EkspanderbarMeny>
    );
};

export default MinsideMeny;
