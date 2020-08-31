import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import SokMenyIkon from 'komponenter/header/header-regular/desktop/sok-dropdown/sok-knapp/SokMenyIkon';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
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
        gaEvent({
            category: GACategory.Header,
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
        >
            <SokMenyIkon isOpen={isOpen} />
        </MenylinjeKnapp>
    );
};
