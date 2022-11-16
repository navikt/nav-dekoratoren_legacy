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
    varsler: state.varsler.data,
    appUrl: state.environment.APP_URL,
    language: state.language.language,
});

export const VarslerKnapp = () => {
    const dispatch = useDispatch();
    const { isOpen, varsler, appUrl, language } = useSelector(stateSelector);

    const antallVarsler = varsler?.oppgaver.length + varsler?.beskjeder.length + varsler?.innbokser.length;

    const toggleVarslerDropdown = () => {
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    const ariaLabel = () => {
        if (antallVarsler > 0) {
            return finnTekst('varsler-tittel', language) + `. Du har ${antallVarsler} varsler.`;
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
            icon={<VarselIkon antallUleste={antallVarsler} />}
        />
    );
};
