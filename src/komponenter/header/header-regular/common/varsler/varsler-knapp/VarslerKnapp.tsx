import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import { VarselIkon } from './varsel-ikon/VarselIkon';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { analyticsEvent } from 'utils/analytics/analytics';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import { AppState } from 'store/reducers';
import { varslerDropdownId } from 'komponenter/header/header-regular/common/varsler/Varsler';
import { finnTekst } from '../../../../../../tekster/finn-tekst';

export const varslerKnappId = 'varsler-knapp-id';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data.varsler,
    appUrl: state.environment.APP_URL,
    language: state.language.language,
});

export const VarslerKnapp = () => {
    const dispatch = useDispatch();
    const { isOpen, varsler, appUrl, language } = useSelector(stateSelector);

    const toggleVarslerDropdown = () => {
        if (!isOpen && varsler.totaltAntallUleste > 0 && varsler.nyesteVarsler.length > 0) {
            settVarslerSomLest(appUrl, varsler.nyesteVarsler[0].id, dispatch);
        }
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    const ariaLabel = () => {
        if (varsler.nyesteVarsler.length > 5) {
            return finnTekst('varsler-vis-5-siste', language);
        } else if (varsler.nyesteVarsler.length > 0) {
            return finnTekst('varsler-tittel', language) + `. Du har ${varsler.nyesteVarsler.length} varsler.`;
        }
        return finnTekst('varsler-tittel', language) + '. ' + finnTekst('varsler-tom-liste', language);
    };

    return (
        <MenylinjeKnapp
            tekstId={'varsler-tittel'}
            onClick={toggleVarslerDropdown}
            isOpen={isOpen}
            classname={'varselbjelle'}
            id={varslerKnappId}
            ariaControls={varslerDropdownId}
            ariaLabel={ariaLabel()}
        >
            <VarselIkon antallUleste={varsler.totaltAntallUleste} />
        </MenylinjeKnapp>
    );
};
