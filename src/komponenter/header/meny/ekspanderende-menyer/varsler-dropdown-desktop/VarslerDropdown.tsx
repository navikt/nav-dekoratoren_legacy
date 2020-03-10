import React from 'react';
import { AppState } from '../../../../../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { EkspanderbarMeny } from '../ekspanderbar-meny/EkspanderbarMeny';
import { toggleVarsler } from '../../../../../reducer/dropdown-toggle-duck';
import { Normaltekst } from 'nav-frontend-typografi';
import Tekst from '../../../../../tekster/finn-tekst';
import { GACategory, triggerGaEvent } from '../../../../../utils/google-analytics';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import './VarslerDropdown.less';
import { VarselIkon } from '../meny-knapper/ikoner/varsel-ikon/VarselIkon';
import { Varselvisning } from './varselvisning/Varselvisning';
import { MenuValue } from '../../../../../utils/meny-storage-utils';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
});

const classname = 'desktop-varsler-dropdown';

export const VarslerDropdown = () => {
    const { isOpen, varsler, innloggetStatus, arbeidsflate } = useSelector(stateSelector);
    const dispatch = useDispatch();

    if (!innloggetStatus.authenticated || arbeidsflate !== MenuValue.PRIVATPERSON) {
        return null;
    }

    const toggleDropdown = () => {
        triggerGaEvent({
            category: GACategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());

    };

    const ariaLabel = `Varsler. Du har ${
        varsler.antall > 0 ? varsler.antall : 'ingen'
    } varsler.`;

    const knapp = (
        <MenylinjeKnapp
            toggleMenu={toggleDropdown}
            isOpen={isOpen}
            classname={'varselbjelle'}
            ariaLabel={ariaLabel}
        >
            <VarselIkon isOpen={isOpen} antallUleste={varsler.uleste} />
            <Normaltekst className={'varselbjelle__tekst'}>
                <Tekst id={'varsler'} />
            </Normaltekst>
        </MenylinjeKnapp>
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
