import React from 'react';
import MenylinjeKnapp from 'komponenter/header/header-regular/common/meny-knapper/MenylinjeKnapp';
import HamburgerIkon from 'komponenter/header/header-regular/common/meny-knapper/ikoner/hamburger-ikon/HamburgerIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Tekst from 'tekster/finn-tekst';
import { desktopHovedmenyKnappId } from 'komponenter/header/header-regular/desktop/hovedmeny/HovedmenyDesktop';
import { gaEvent } from 'utils/google-analytics';
import { GACategory } from 'utils/google-analytics';
import { toggleHovedmeny } from 'store/reducers/dropdown-toggle-duck';
import { useDispatch } from 'react-redux';
import { MenuValue } from 'utils/meny-storage-utils';

type Props = {
    isOpen: boolean;
    arbeidsflate: MenuValue;
};

export const HovedmenyKnapp = ({ isOpen, arbeidsflate }: Props) => {
    const dispatch = useDispatch();

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
            onClick={toggleMenu}
            isOpen={isOpen}
            classname={classname}
            id={desktopHovedmenyKnappId}
            ariaLabel={'Hovedmenyknapp'}
        >
            <HamburgerIkon isOpen={isOpen} />
            <Undertittel>
                <Tekst id="meny-knapp" />
            </Undertittel>
        </MenylinjeKnapp>
    );
};
