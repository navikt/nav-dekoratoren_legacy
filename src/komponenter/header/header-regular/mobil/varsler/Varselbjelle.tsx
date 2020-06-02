import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { settVarslerSomLest } from 'store/reducers/varsel-lest-duck';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { VarslerKnapp } from 'komponenter/header/header-regular/common/meny-knapper/varsler-knapp/VarslerKnapp';
import { AppState } from 'store/reducers';
import { toggleVarsler } from 'store/reducers/dropdown-toggle-duck';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.varsler,
    varsler: state.varsler.data,
    appBaseUrl: state.environment.APP_BASE_URL,
});

export const Varselbjelle = () => {
    const dispatch = useDispatch();
    const { isOpen, varsler, appBaseUrl } = useSelector(stateSelector);

    const toggleVarslerSlidein = () => {
        if (!isOpen && varsler.uleste > 0) {
            settVarslerSomLest(appBaseUrl, varsler.nyesteId, dispatch);
        }
        gaEvent({
            category: GACategory.Header,
            action: `varsler-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleVarsler());
    };

    return (
        <VarslerKnapp
            onClick={toggleVarslerSlidein}
            isOpen={isOpen}
            varsler={varsler}
            varslerDropdownClassname={'mobilmeny__varsel-innhold'}
        />
    );
};
