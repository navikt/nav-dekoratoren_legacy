import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import SokMenyIkon from 'komponenter/header/header-regular/desktop/sok-dropdown/sok-knapp/SokMenyIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleSok } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { sokDropdownClassname } from 'utils/id-repo';
import { desktopSokKnappId } from 'utils/id-repo';

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
            onClick={toggleMenu}
            isOpen={isOpen}
            classname={sokDropdownClassname}
            ariaControls={sokDropdownClassname}
            id={desktopSokKnappId}
        >
            <SokMenyIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id={'sok-knapp'} />
            </Undertittel>
        </MenylinjeKnapp>
    );
};
