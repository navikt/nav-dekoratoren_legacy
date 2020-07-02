import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { getMinsideMenyNode } from 'utils/meny-storage-utils';
import { Status } from 'api/api';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
// import MinsideMenyInnhold from './MinsideMenyInnhold';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MinsidePersonKnapp } from './minside-knapper/MinsidePersonKnapp';
import { useState } from 'react';
import { useEffect } from 'react';
import './MinsideMeny.less';

import loadable from '@loadable/component';
const MinsideMenyInnhold = loadable(() => import('./MinsideMenyInnhold'));

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    isOpen: state.dropdownToggles.minside,
    language: state.language.language,
    menyPunkter: state.menypunkt,
    arbeidsflate: state.arbeidsflate.status,
});

export const minsideMenyClassname = 'desktop-minside-meny';
export const minsideKnappId = 'desktop-minside-knapp-id';

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

    const [renderContent, setRenderContent] = useState(false);
    const menyLoaded = menyPunkter.status === Status.OK;

    useEffect(() => {
        const loadedAndOpened = renderContent || (menyLoaded && isOpen);
        setRenderContent(loadedAndOpened);
    }, [menyLoaded, isOpen]);

    const minsideMenyPunkter = getMinsideMenyNode(menyPunkter.data, language);

    // Hide empty menues
    if (menyLoaded && !minsideMenyPunkter?.hasChildren) {
        return null;
    }

    const dropdownInnhold =
        menyPunkter.status === Status.OK ? (
            <MinsideMenyInnhold
                classname={minsideMenyClassname}
                menyLenker={minsideMenyPunkter}
                dittNavUrl={environment.DITT_NAV_URL}
                brukernavn={innloggetStatus.name?.toLowerCase() || ''}
                authLevel={innloggetStatus.securityLevel}
            />
        ) : (
            <Spinner tekstId={'meny-loading'} />
        );

    return (
        <div className={'media-tablet-desktop'}>
            <MinsidePersonKnapp
                classname={minsideMenyClassname}
                id={minsideKnappId}
            />
            <EkspanderbarMeny
                isOpen={isOpen}
                classname={minsideMenyClassname}
                id={minsideMenyClassname}
            >
                {renderContent && dropdownInnhold}
            </EkspanderbarMeny>
        </div>
    );
};

export default MinsideMeny;
