import React from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { getMinsideMenyNode, MenuValue } from 'utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import { toggleMinsideMeny } from 'store/reducers/dropdown-toggle-duck';
import { Status } from 'api/api';
import Spinner from 'komponenter/header/header-regular/common/spinner/Spinner';
import EkspanderbarMeny from 'komponenter/header/header-regular/common/ekspanderbar-meny/EkspanderbarMeny';
import MinsideVisning from './minside-visning/MinsideVisning';
import { MinsidePersonKnapp } from 'komponenter/header/header-regular/common/meny-knapper/minside-knapper/MinsidePersonKnapp';
import MinsideArbgiverKnapp from 'komponenter/header/header-regular/common/meny-knapper/minside-knapper/MinsideArbgiverKnapp';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { KbNavGroup } from 'utils/keyboard-navigation/kb-navigation';
import './MinsideMeny.less';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.minside,
    language: state.language.language,
    menyPunkter: state.menypunkt,
});

const classname = 'desktop-minside-meny';
export const desktopMinsideKnappId = 'desktop-minside-meny-knapp-id';

type Props = {
    kbNavMainState: KbNavMain;
};

export const MinsideMeny = ({ kbNavMainState }: Props) => {
    const dispatch = useDispatch();
    const { environment } = useSelector((state: AppState) => state);
    const { arbeidsflate, innloggetStatus } = useSelector(stateSelector);
    const { isOpen, language, menyPunkter } = useSelector(stateSelector);
    const minsideMenyPunkter = getMinsideMenyNode(menyPunkter.data, language);
    useKbNavSub(
        configForNodeGroup[KbNavGroup.MinsideMeny],
        kbNavMainState,
        isOpen
    );

    if (
        !innloggetStatus.authenticated ||
        arbeidsflate === MenuValue.SAMARBEIDSPARTNER ||
        arbeidsflate === MenuValue.IKKEBESTEMT
    ) {
        return null;
    }

    if (arbeidsflate === MenuValue.ARBEIDSGIVER) {
        return (
            <MinsideArbgiverKnapp
                classname={classname}
                id={desktopMinsideKnappId}
                href={environment.MINSIDE_ARBEIDSGIVER_URL}
            />
        );
    }

    const knapp = (
        <MinsidePersonKnapp
            onClick={() => {
                triggerGaEvent({
                    context: arbeidsflate,
                    category: GACategory.Header,
                    action: `minside-meny-${isOpen ? 'close' : 'open'}`,
                });
                dispatch(toggleMinsideMeny());
            }}
            isOpen={isOpen}
            classname={classname}
            id={desktopMinsideKnappId}
            ariaLabel={'Min side menyknapp'}
            brukerNavn={innloggetStatus.name}
        />
    );

    // Hide empty menues
    if (menyPunkter.status === Status.OK && !minsideMenyPunkter?.hasChildren) {
        return null;
    }

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={classname}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <MinsideVisning
                    classname={classname}
                    isOpen={isOpen}
                    menyLenker={minsideMenyPunkter}
                    dittNavUrl={environment.DITT_NAV_URL}
                />
            ) : (
                <Spinner tekstId={'meny-loading'} />
            )}
        </EkspanderbarMeny>
    );
};

export default MinsideMeny;
