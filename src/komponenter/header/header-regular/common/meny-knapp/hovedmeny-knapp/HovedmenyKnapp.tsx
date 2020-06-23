import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapp/MenylinjeKnapp';
import HamburgerIkon from 'komponenter/header/header-regular/common/meny-knapp/hamburger-ikon/HamburgerIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { useSelector } from 'react-redux';

const stateSelector = (state: AppState) => ({
    arbeidsflate: state.arbeidsflate.status,
    isOpen: state.dropdownToggles.hovedmeny,
});

type Props = {
    id?: string;
};

const classname = 'hovedmeny';

export const HovedmenyKnapp = ({ id }: Props) => {
    const dispatch = useDispatch();
    const { arbeidsflate, isOpen } = useSelector(stateSelector);

    const toggleMenu = () => {
        gaEvent({
            context: arbeidsflate,
            category: GACategory.Header,
            action: `meny-${isOpen ? 'close' : 'open'}`,
        });
        dispatch(toggleHovedmeny());
    };

    return (
        <MenylinjeKnapp
            isOpen={isOpen}
            classname={classname}
            onClick={toggleMenu}
            ariaControls={classname}
            id={id}
        >
            <HamburgerIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );
};
