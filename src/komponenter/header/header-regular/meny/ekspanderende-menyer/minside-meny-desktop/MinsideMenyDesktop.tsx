import React from 'react';
import { AppState } from '../../../../../../reducer/reducers';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMinsideMenyNode,
    MenuValue,
} from '../../../../../../utils/meny-storage-utils';
import {
    GACategory,
    triggerGaEvent,
} from '../../../../../../utils/google-analytics';
import { toggleMinsideMeny } from '../../../../../../reducer/dropdown-toggle-duck';
import { Status } from '../../../../../../api/api';
import MenySpinner from '../meny-spinner/MenySpinner';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import MinsideDropdown from './minside-dropdown/MinsideDropdown';
import './MinsideMenyDesktop.less';
import { MinsidePersonKnapp } from '../meny-knapper/minside-knapper/MinsidePersonKnapp';
import MinsideArbgiverKnapp from '../meny-knapper/minside-knapper/MinsideArbgiverKnapp';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.minside,
    language: state.language.language,
    menyPunkter: state.menypunkt,
});

const classname = 'desktop-minside-meny';
export const desktopMinsideKnappId = `${classname}-knapp-id`;

export const MinsideMenyDesktop = () => {
    const dispatch = useDispatch();
    const { environment } = useSelector((state: AppState) => state);
    const { arbeidsflate, innloggetStatus } = useSelector(stateSelector);
    const { isOpen, language, menyPunkter } = useSelector(stateSelector);

    if (
        !innloggetStatus.authenticated ||
        arbeidsflate === MenuValue.SAMARBEIDSPARTNER ||
        arbeidsflate === MenuValue.IKKEVALGT
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

    const minsideMenyPunkter = getMinsideMenyNode(menyPunkter.data, language);
    if (!minsideMenyPunkter?.hasChildren) {
        return null;
    }

    const knapp = (
        <MinsidePersonKnapp
            toggleMenu={() => {
                triggerGaEvent({
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

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={classname}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <MinsideDropdown
                    classname={classname}
                    isOpen={isOpen}
                    menyLenker={minsideMenyPunkter}
                />
            ) : (
                <MenySpinner />
            )}
        </EkspanderbarMeny>
    );
};

export default MinsideMenyDesktop;
