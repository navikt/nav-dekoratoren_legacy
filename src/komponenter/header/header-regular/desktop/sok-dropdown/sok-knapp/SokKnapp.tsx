import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import SokIkon from 'komponenter/header/header-regular/common/sok/sok-ikon/SokIkon';
import { analyticsEvent } from 'utils/analytics/analytics';
import { AnalyticsCategory } from 'utils/analytics/analytics';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { sokDropdownClassname } from '../SokDropdown';

export const desktopSokKnappId = 'desktop-sok-knapp';

const stateSelector = (state: AppState) => ({
    isOpen: state.dropdownToggles.sok,
});

export const SokKnapp = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(stateSelector);

    const toggleMenu = () => {
        analyticsEvent({
            category: AnalyticsCategory.Header,
            action: `sok-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleSok());
    };

    return (
        <MenylinjeKnapp
            tekstId={'sok-knapp'}
            onClick={toggleMenu}
            isOpen={isOpen}
            classname={sokDropdownClassname}
            ariaControls={sokDropdownClassname}
            id={desktopSokKnappId}
            icon={<SokIkon isOpen={isOpen} />}
        />
    );
};
