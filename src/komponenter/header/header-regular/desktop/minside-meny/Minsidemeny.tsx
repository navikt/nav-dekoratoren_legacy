import React from 'react';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { getMinsidemenyNode } from 'utils/meny-storage-utils';
import { Status } from 'api/api';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import MinsidemenyInnhold from './MinsidemenyInnhold';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import { MinsidePersonKnapp } from './minside-knapper/MinsidePersonKnapp';
import './Minsidemeny.less';

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

export const Minsidemeny = ({ kbNavMainState }: Props) => {
    const { environment } = useSelector((state: AppState) => state);
    const { innloggetStatus } = useSelector(stateSelector);
    const { isOpen, language, menyPunkter } = useSelector(stateSelector);
    useKbNavSub(configForNodeGroup[KbNavGroup.Minsidemeny], kbNavMainState, isOpen);

    const minsideMenyPunkter = getMinsidemenyNode(menyPunkter.data, language);

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !minsideMenyPunkter?.hasChildren) {
        return null;
    }

    const brukernavn = innloggetStatus.name?.toLowerCase() || '';

    return (
        <div className={'media-tablet-desktop'} data-testid={'minside-meny'}>
            <MinsidePersonKnapp classname={minsideMenyClassname} id={minsideKnappId} brukernavn={brukernavn} />
            <EkspanderbarMeny isOpen={isOpen} classname={minsideMenyClassname} id={minsideMenyClassname}>
                {menyPunkter.status === Status.OK ? (
                    <MinsidemenyInnhold
                        classname={minsideMenyClassname}
                        menyLenker={minsideMenyPunkter}
                        dittNavUrl={environment.MIN_SIDE_URL}
                        brukernavn={brukernavn}
                        authLevel={innloggetStatus.securityLevel}
                    />
                ) : (
                    <Spinner tekstId={'meny-loading'} />
                )}
            </EkspanderbarMeny>
        </div>
    );
};

export default Minsidemeny;
