import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import { VarselIkon } from './varsel-ikon/VarselIkon';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { analyticsEvent } from 'utils/analytics';
import { AnalyticsCategory } from 'utils/analytics';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';
import { AppState } from 'store/reducers';
import { varslerDropdownClassname } from 'komponenter/header/header-regular/common/varsler/Varsler';
import './VarslerKnapp.less';

export const varslerKnappId = 'varsler-knapp-id';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    appUrl: state.environment.APP_URL,
});

export const VarslerKnapp = () => {
    const dispatch = useDispatch();
    const { isOpen, varsler, appUrl } = useSelector(stateSelector);

    const toggleVarslerDropdown = () => {
        if (!isOpen && varsler.uleste > 0) {
            settVarslerSomLest(appUrl, varsler.nyesteId, dispatch);
        }
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    const ariaLabel = `Varsler. Du har ${
        varsler.antall > 0 ? varsler.antall : 'ingen'
    } varsler.`;

    return (
        <MenylinjeKnapp
            tekstId={'varsler-tittel'}
            onClick={toggleVarslerDropdown}
            isOpen={isOpen}
            classname={'varselbjelle'}
            id={varslerKnappId}
            ariaControls={varslerDropdownClassname}
            ariaLabel={ariaLabel}
        >
            <VarselIkon isOpen={isOpen} antallUleste={varsler.uleste} />
        </MenylinjeKnapp>
    );
};
