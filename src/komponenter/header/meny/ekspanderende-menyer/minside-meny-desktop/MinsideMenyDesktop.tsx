import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { MenuValue } from '../../../../../utils/meny-storage-utils';
import { GACategory, triggerGaEvent } from '../../../../../utils/google-analytics';
import { toggleMinsideMeny } from '../../../../../reducer/dropdown-toggle-duck';
import { Status } from '../../../../../api/api';
import { MenySpinner } from '../meny-spinner/MenySpinner';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import MinsideDropdown from './minside-dropdown/MinsideDropdown';
import './MinsideMenyDesktop.less';
import { getMinsideMenyPunkter } from './minside-dropdown/minside-lenker';
import MinsidePersonKnapp from '../meny-knapper/minside-knapper/MinsidePersonKnapp';
import Environment from '../../../../../utils/Environment';
import MinsideArbgiverKnapp from '../meny-knapper/minside-knapper/MinsideArbgiverKnapp';

const stateSelector = (state: AppState) => ({
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.minside,
    // menyPunkter: state.menypunkt,
});

const classname = 'desktop-minside-meny';

export const MinsideMenyDesktop = () => {
    const { arbeidsflate, innloggetStatus, isOpen } = useSelector(stateSelector);
    const dispatch = useDispatch();

    if (!innloggetStatus.authenticated
        || arbeidsflate === MenuValue.SAMARBEIDSPARTNER
        || arbeidsflate === MenuValue.IKKEVALGT) {
        return null;
    }

    if (arbeidsflate === MenuValue.ARBEIDSGIVER) {
        return (
            <MinsideArbgiverKnapp
                classname={classname}
                href={Environment.MINSIDE_ARBEIDSGIVER_URL}
            />);
    }

    const menyPunkter = getMinsideMenyPunkter();

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
            ariaLabel={'Min side menyknapp'}
            brukerNavn={innloggetStatus.name}
        />);

    return (
        <EkspanderbarMeny
            isOpen={isOpen}
            menyKnapp={knapp}
            classname={'desktop-dropdown'}
            id={classname}
        >
            {menyPunkter.status === Status.OK ? (
                <MinsideDropdown
                    classname={classname}
                    isOpen={isOpen}
                    menyLenker={menyPunkter.data[0]}
                />
            ) : <MenySpinner />}
        </EkspanderbarMeny>
    );
};

export default MinsideMenyDesktop;
