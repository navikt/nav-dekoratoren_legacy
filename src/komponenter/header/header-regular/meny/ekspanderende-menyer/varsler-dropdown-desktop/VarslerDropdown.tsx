import React from 'react';
import { AppState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import EkspanderbarMeny from '../ekspanderbar-meny/EkspanderbarMeny';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { Normaltekst } from 'nav-frontend-typografi';
import Tekst from 'tekster/finn-tekst';
import { GACategory, triggerGaEvent } from 'utils/google-analytics';
import MenylinjeKnapp from '../meny-knapper/MenylinjeKnapp';
import { VarselIkon } from '../meny-knapper/ikoner/varsel-ikon/VarselIkon';
import { Varselvisning } from './varselvisning/Varselvisning';
import { MenuValue } from 'utils/meny-storage-utils';
import './VarslerDropdown.less';
import { KbNavMain } from 'utils/keyboard-navigation/useKbNavMain';
import { useKbNavSub } from 'utils/keyboard-navigation/useKbNavSub';
import { configForNodeGroup } from 'utils/keyboard-navigation/kb-navigation-setup';
import { NodeGroup } from 'utils/keyboard-navigation/kb-navigation';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    innloggetStatus: state.innloggingsstatus.data,
    arbeidsflate: state.arbeidsflate.status,
    appBaseUrl: state.environment.APP_BASE_URL,
});

const classname = 'desktop-varsler-dropdown';
export const desktopVarslerKnappId = `${classname}-knapp-id`;

type Props = {
    kbNavMainState: KbNavMain;
};

export const VarslerDropdown = ({ kbNavMainState }: Props) => {
    const {
        isOpen,
        varsler,
        innloggetStatus,
        arbeidsflate,
        appBaseUrl,
    } = useSelector(stateSelector);
    const dispatch = useDispatch();
    useKbNavSub(configForNodeGroup[NodeGroup.Varsler], kbNavMainState, isOpen);

    if (
        !innloggetStatus.authenticated ||
        arbeidsflate !== MenuValue.PRIVATPERSON
    ) {
        return null;
    }

    const toggleDropdown = () => {
        if (!isOpen && varsler.uleste > 0) {
            settVarslerSomLest(appBaseUrl, varsler.nyesteId, dispatch);
        }
        triggerGaEvent({
            context: arbeidsflate,
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
            id={desktopVarslerKnappId}
            ariaLabel={ariaLabel}
        >
            <VarselIkon isOpen={isOpen} antallUleste={varsler.uleste} />
            <Normaltekst className={'varselbjelle__tekst'}>
                <Tekst id={'varsler-tittel'} />
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
            <Varselvisning isOpen={isOpen} />
        </EkspanderbarMeny>
    );
};
